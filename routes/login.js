require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;

    const client = await Client.findOne({ email });
    if (client) {
      jwt.sign(
        { client },
        process.env.SECRET_KEY,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            res.sendStatus(403);
          } else {
            res.json({ token });
          }
        },
      );
    } else {
      res.json({ message: 'Email not found' });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

const verifyJWToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader !== undefined) {
    // req.token = bearerHeader.split(' ')[1];
    // console.log('TCL: verifyJWToken -> bearerHeader', bearerHeader);
    // Quit the word Bearer from the string
    req.token = bearerHeader.slice(7);
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  router,
  verifyJWToken,
};
