const express = require('express');
const router = express.Router();

const bulbRoute = require('../components/bulb/bulb.route');
const devRoute = require('../components/devices/devices.routes');
const plugRoute = require('../components/plug/plug.routes');



router.use('/bulb', bulbRoute);
router.use('/devices', devRoute);
router.use('/plug', plugRoute);

module.exports = router;