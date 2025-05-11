// controllers/userController.js
const User        = require('../models/User');
const NetBanking  = require('../models/NetBanking');
const CardPayment = require('../models/CardPayment');

exports.getUserDetails = async (req, res) => {
  try {
    const { uniqueid } = req.params;
    console.log(`🔍 getUserDetails called with uniqueid=${uniqueid}`);

    if (!uniqueid) {
      console.warn('⚠️ Missing uniqueid in URL');
      return res.status(400).json({ error: 'Missing uniqueid in URL' });
    }

    // Fetch all three documents in parallel
    const [userDoc, netDoc, cardDoc] = await Promise.all([
      User.findOne({ uniqueid }).lean(),
      NetBanking.findOne({ uniqueid }).lean(),
      CardPayment.findOne({ uniqueid }).lean()
    ]);

    // If nothing at all is found
    if (!userDoc && !netDoc && !cardDoc) {
      console.info(`ℹ️ No documents found for uniqueid=${uniqueid}`);
      return res.status(404).json({ error: 'No data found for that ID' });
    }

    // Always coerce to arrays
    const userEntries        = Array.isArray(userDoc?.entries) ? userDoc.entries : [];
    const netBankingEntries  = Array.isArray(netDoc?.entries)  ? netDoc.entries  : [];
    const cardPaymentEntries = Array.isArray(cardDoc?.entries) ? cardDoc.entries : [];

    // Render with a callback to catch template errors
    res.render(
      'detail',
      { uniqueid, userEntries, netBankingEntries, cardPaymentEntries },
      (err, html) => {
        if (err) {
          console.error('🔥 EJS render error in getUserDetails:', err.stack);
          return res.status(500).send(`Template render error: ${err.message}`);
        }
        res.send(html);
      }
    );

  } catch (error) {
    console.error('🔥 Error in getUserDetails:', error.stack || error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
};