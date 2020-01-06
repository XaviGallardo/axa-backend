require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const Policy = require('../models/Policy');
const { verifyJWToken } = require('./login');

const router = express.Router();

router.get('/client/:name', verifyJWToken, async (req, res, next) => {
  let policies = [];
  const { name } = req.params;
  jwt.verify(req.token, `${process.env.SECRET_KEY}`, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else if (authData.client.role === 'admin') {
      try {
        // Maybe different clients with the same name
        const clients = await Client.find({ name });

        if (clients.length > 0) {
          for (const client of clients) {
            const clientPolicies = await Policy.find({ clientId: client.id });
            policies.push(clientPolicies);
          }

          res.json({
            clients,
            policies,
          });
        } else {
          res.json({ message: 'Sorry, Client not found.' });
        }
      } catch (error) {
        res.json({ message: error });
      }
    } else {
      res.sendStatus(403);
    }
  });
});

router.get('/:id', verifyJWToken, async (req, res, next) => {
  const { id } = req.params;
  jwt.verify(req.token, `${process.env.SECRET_KEY}`, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else if (authData.client.role === 'admin') {
      try {
        const policy = await Policy.findOne({ id });
        if (policy) {
          const client = await Client.findOne({ id: policy.clientId });
          if (client) {
            res.json(client);
          } else {
            res.json({
              message: `Sorry, not found any Client linked to the policy number: ${id}`,
            });
          }
        } else {
          res.json({
            message: `Sorry, not found any Policy Data with the number: ${id}`,
          });
        }
      } catch (error) {
        res.json({ message: error });
      }
    } else {
      res.sendStatus(403);
    }
  });
});

module.exports = router;
