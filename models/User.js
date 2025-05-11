const mongoose = require('mongoose');

// Subdocument schema for each user entry
const EntrySchema = new mongoose.Schema({
  fullName:      { type: String, required: true },
  mobileNumber:  { type: String, required: true },
  accountNumber:     { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  createdAt:     { type: Date,   default: Date.now }
});

// Main User schema with entries array
const UserSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  entries:  { type: [EntrySchema], default: [] }
});

module.exports = mongoose.model('User', UserSchema);