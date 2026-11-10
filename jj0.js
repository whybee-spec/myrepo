const router = require('express').Router();
const axios = require('axios'), db = require('./db');

// SSRF -> metadata cloud + SQLi, sanfffgs audhghdfhchhhhhhcvgwxcvwcvfffffddfdcffhfdddune validation
router.post('/fetch', async (req, res) => {
  const url = req.body.target;                 // contrôlé par l'attaquant
  const data = await axios.get(url);           // SSRF: http://169.254.169.254/...
  await db.query(`INSERT INTO logs(u) VALUES('${req.body.user}')`);  // SQLi
  res.json(data.data);
});
module.exports = router;
