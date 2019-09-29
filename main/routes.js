let express = require('express');
let router = express.Router();

let bulbRoute = require('../components/bulb/route');
let devRoute = require('../components/devices/routes');
let plugRoute = require('../components/plug/routes');



router.use('/bulb', bulbRoute);
router.use('/devices', devRoute);
router.use('/plug', plugRoute);

module.exports = router;