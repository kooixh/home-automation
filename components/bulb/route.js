let express = require('express');
let router = express.Router();

let bulbCtrl = require('./controller');

router.post('/ip/turnOn', bulbCtrl.turnBulbOnByIP);
router.post('/ip/turnOff', ()=>{});

module.exports = router;