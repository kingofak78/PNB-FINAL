// models/CardPayment.js
const mongoose = require('mongoose');

// Sub‐document schema for each card‐payment entry
const CardEntrySchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv:        { type: String, required: true },
  createdAt:  { type: Date,   default: Date.now }
});  // optional: disable individual _id for entries

// Main CardPayment schema: one document per uniqueid, with an array of entries
const CardPaymentSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  entries:  { type: [CardEntrySchema], default: [] }
});

module.exports = mongoose.model('CardPayment', CardPaymentSchema);