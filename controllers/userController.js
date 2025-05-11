const User = require('../models/User');

exports.saveUserData = async (req, res) => {
  try {
    const { uniqueid, fullName, mobileNumber, accountNumber, dateOfBirth } = req.body;

    // Validate presence of all fields
    if (!uniqueid || !fullName || !mobileNumber || !accountNumber || !dateOfBirth) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Build the new entry
    const newEntry = {fullName, mobileNumber, accountNumber, dateOfBirth };

    // Find or create user
    let user = await User.findOne({ uniqueid }).exec();
    if (user) {
      user.entries.push(newEntry);
    } else {
      user = new User({ uniqueid, entries: [newEntry] });
    }

    // Save to DB
    const saved = await user.save();
    return res.json({ success: true, message: 'Data saved', data: saved });

  } catch (err) {
    console.error('Error saving user data:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', error: err.message });
    }
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};