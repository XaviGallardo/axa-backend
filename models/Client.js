const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientSchema = new Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  role: { type: String },
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
