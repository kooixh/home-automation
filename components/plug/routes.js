let express = require('express');
let router = express.Router();

let plugCtrl = require('./controller');

router.post('/ip/turnOn', plugCtrl.turnPlugOnByIP);
router.post('/ip/turnOff', plugCtrl.turnPlugOffByIP);

module.exports = router;