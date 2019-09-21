let express = require('express');
let router = express.Router();

let bulbRoute = require('../components/bulb/route');
let devRoute = require('../components/devices/routes');



router.use('/bulb', bulbRoute);
router.use('/devices', devRoute);
module.exports = router;