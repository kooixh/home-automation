const express = require('express');
const router = express.Router();

let plugCtrl = require('../controllers/plug.controller');

router.post('/ip/turnOn', plugCtrl.turnPlugOnByIP);
router.post('/ip/turnOff', plugCtrl.turnPlugOffByIP);

module.exports = router;
