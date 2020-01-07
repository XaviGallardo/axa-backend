require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const { verifyJWToken } = require('./login');

const router = express.Router();

router.get('/:type/:data', verifyJWToken, async (req, res, next) => {
  const { type, data } = req.params;
  if (type === 'id' || type === 'name') {
    jwt.verify(
      req.token,
      `${process.env.SECRET_KEY}`,
      async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else if (
          authData.client.role === 'user' ||
          authData.client.role === 'admin'
        ) {
          try {
            let client;
            if (type === 'id') {
              client = await Client.findOne({ id: data });
            } else {
              client = await Client.find({ name: data });
            }
            if (client || client.length > 0) {
              res.json({ client });
            } else {
              res.json({ message: 'Client not found' });
            }
          } catch (error) {
            res.json({ message: err });
          }
        } else {
          res.sendStatus(403);
        }
      },
    );
  } else {
    res.json({ message: 'Invalid URL' });
  }
});

module.exports = router;
