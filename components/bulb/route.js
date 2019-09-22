let express = require('express');
let router = express.Router();

let bulbCtrl = require('./controller');

router.post('/ip/turnOn', bulbCtrl.turnBulbOnByIP);
router.post('/ip/turnOff', bulbCtrl.turnBulbOffByIP);
router.post('/ip/brightness', bulbCtrl.setBulbBrightness);
router.post('/ip/color', bulbCtrl.setBulbColour);
router.post('/ip/colorTemperature', bulbCtrl.setColourTemperature);



module.exports = router;