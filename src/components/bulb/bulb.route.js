const express = require('express');
const router = express.Router();

const bulbCtrl = require('./bulb.controller');

router.post('/ip/turnOn', bulbCtrl.turnBulbOnByIP);
router.post('/ip/turnOff', bulbCtrl.turnBulbOffByIP);
router.post('/ip/brightness', bulbCtrl.setBulbBrightness);
router.post('/ip/color', bulbCtrl.setBulbColour);
router.post('/ip/colorTemperature', bulbCtrl.setColourTemperature);

module.exports = router;