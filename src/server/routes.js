const express = require('express');
const router = express.Router();

const bulbRoute = require('../api/bulb/routes/bulb.routes');
const devRoute = require('../api/devices/routes/devices.routes');
const plugRoute = require('../api/plug/routes/plug.routes');

router.use('/bulb', bulbRoute);
router.use('/devices', devRoute);
router.use('/plug', plugRoute);

module.exports = router;
