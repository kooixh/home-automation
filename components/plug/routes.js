const express = require('express');
const router = express.Router();

let plugCtrl = require('./controller');

router.post('/ip/turnOn', plugCtrl.turnPlugOnByIP);
router.post('/ip/turnOff', plugCtrl.turnPlugOffByIP);

module.exports = router;