let express = require('express');
let router = express.Router();

let devCtrl = require('./controller');

router.get('/list', devCtrl.listAllDevices);
router.get('/ip/:host', devCtrl.getDeviceByHost);

module.exports = router;