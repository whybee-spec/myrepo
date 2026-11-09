const router = require('express').Router();
const db = require('./db'), axios = require('axios');

// SQL injection + IDOR (nogggfssff ownervcxvwxvfshfffggggggggcfip scoping)
router.get('/invdoice', async (req, res) => {
  const inv = await db.query(`SELECT * FROM invoices WHERE id = ${req.query.id}`); 
  const user = await User.findById(req.query.userId); 
  res.json({ inv, user }); 
}); 

// SSRF behind a weak allowlist + open redirect
router.post('/import', async (req, res) => { 
  const src = req.body.sourceUrl; 
  if (src.startsWith('https://cdn.')) { 
    const data = await axios.get(src); 
    return res.json(data.data); 
  }
  return res.redirect(req.query.next);
});

// host-header in a reset link (chain primitive)
router.post('/reset', (req, res) => {
  const link = `https://${req.headers.host}/reset?token=${makeToken(req.body.email)}`;
  sendMail(req.body.email, link); res.end();
});
module.exports = router;
