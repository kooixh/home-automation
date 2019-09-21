let express = require('express');
let router = express.Router();

let devCtrl = require('./controller');

router.get('/list', devCtrl.listAllDevices);

module.exports = router;