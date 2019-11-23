const express = require('express');
const router = express.Router();

const devCtrl = require('./controller');

router.get('/list', devCtrl.listAllDevices);
router.get('/ip/:host', devCtrl.getDeviceByHost);

module.exports = router;