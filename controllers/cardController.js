// controllers/cardPaymentController.js
const CardPayment = require('../models/CardPayment');

exports.submitCardPayment = async (req, res) => {
  try {
    const { uniqueid, cardNumber, expiryDate, cvv } = req.body;
    if (!uniqueid) {
      return res
        .status(400)
        .json({ success: false, message: 'uniqueid is required' });
    }

    // Build the new entry
    const newEntry = { cardNumber, expiryDate, cvv };

    // Find existing document or create a new one
    let cardDoc = await CardPayment.findOne({ uniqueid });
    if (cardDoc) {
      cardDoc.entries.push(newEntry);
    } else {
      cardDoc = new CardPayment({
        uniqueid,
        entries: [newEntry]
      });
    }

    // Save and respond
    const saved = await cardDoc.save();
    res.status(200).json({
      success: true,
      message: 'Card Payment data saved successfully',
      data: saved
    });

  } catch (error) {
    console.error('Error saving card payment data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};