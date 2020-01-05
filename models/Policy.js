const mongoose = require('mongoose');

const { Schema } = mongoose;

const PolicySchema = new Schema({
  id: { type: String },
  amountInsured: { type: Number },
  email: { type: String },
  inceptionDate: { type: Date },
  installmentPayment: { type: Boolean },
  clientId: { type: String },
});

const Policy = mongoose.model('Policy', PolicySchema);

module.exports = Policy;
