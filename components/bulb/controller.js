/**
 *
 *
 * Created by Xiu Hong 21/9/2019
 *
 */
const colourUtils = require('../../utils/colour.utils');
const colourConvert = require('color-convert');
const bulbSrv = require('./services');




/**
 *
 * Turn a bulb on using ip
 *
 * @param req
 * @param res
 * @param next
 */
async function turnBulbOnByIP(req, res, next) {

    if(!req.body || !req.body.hasOwnProperty('host'))
        return next(new Error('Body does not has host field.'));

    let hostAddress = req.body.host;
    try{
        let bulb = await bulbSrv.getDeviceByIP(hostAddress);
        if (bulb === null)
            return res.status(404).json({status: 'error', message:'Device not found for host', data: {}});
        let response = await bulbSrv.turnBulbOn(bulb);
        return res.status(200).json(response);
    }catch (e) {
        next(e);
    }
}

/**
 *
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function turnBulbOffByIP(req, res, next) {
    if(!req.body || !req.body.hasOwnProperty('host'))
        return next(new Error('Body does not has host field.'));

    let hostAddress = req.body.host;
    try{
        let bulb = await bulbSrv.getDeviceByIP(hostAddress);

        if (bulb === null)
            return res.status(404).json({status: 'error', message:'Device not found for host', data: {}});

        let response = await bulbSrv.turnBulbOff(bulb);
        return res.status(200).json(response);
    }catch (e) {
        next(e);
    }
}

/**
 *
 * Set the brightness of a bulb
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function setBulbBrightness(req, res, next) {

    if(!req.body || !req.body.hasOwnProperty('host')) return next(new Error('Body does not have host field.'));
    if(!req.body || !req.body.hasOwnProperty('brightness')) return next(new Error('Body does not have brightness field.'));

    if(isNaN(req.body.brightness) || req.body.brightness === '') return next(new Error('Brightness value is not a number'));
    let brightness = parseInt(req.body.brightness);

    if(brightness < 0 || brightness > 100 ) return next(new Error('Invalid brightness level'));

    try {
        let bulb = await bulbSrv.getDeviceByIP(req.body.host);

        if(bulb === null) return res.status(400).json({status: 'error', message: 'Device not found for host'});

        let response = await bulbSrv.setBulbBrightness(bulb, brightness);
        return res.status(200).json(response);


    } catch (e) {
        next(e);
    }

}


/**
 *
 * Set the brightness of a bulb
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function setBulbColour(req, res, next) {

    if(!req.body || !req.body.hasOwnProperty('host')) return next(new Error('Body does not have host field.'));
    if(!req.body || !req.body.hasOwnProperty('color')) return next(new Error('Body does not have colour field.'));

    if(!colourUtils.isHEXColour(req.body.color)) return next(new Error('Colour has to be in hex value. e.g: 2f458a'));
    let hsv = colourConvert.hex.hsv(req.body.color);

    try {
        let bulb = await bulbSrv.getDeviceByIP(req.body.host);
        if(bulb === null) return res.status(400).json({status: 'error', message: 'Device not found for host'});

        if(!bulb.supportsColor) return res.status(400).json({status: 'error', message: 'Your bulb does not support color'});

        let response = await bulbSrv.setBulbColour(bulb, hsv);
        return res.status(200).json(response);

    } catch (e) {
        next(e);
    }

}

/**
 *
 *
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function setColourTemperature(req, res, next) {
    if(!req.body || !req.body.hasOwnProperty('host')) return next(new Error('Body does not have host field.'));
    if(!req.body || !req.body.hasOwnProperty('temperature')) return next(new Error('Body does not have temperature field.'));


    if(isNaN(req.body.temperature) || req.body.temperature === '') return next(new Error('Brightness value is not a number'));

    let temperature = parseInt(req.body.temperature);
    try {
        let bulb = await bulbSrv.getDeviceByIP(req.body.host);
        if (bulb === null) return res.status(400).json({status: 'error', message: 'Device not found for host'});

        if (!bulb.supportsColorTemperature) return res.status(400).json({status: 'error', message: 'Your bulb does not support color'});

        let range = bulb.getColorTemperatureRange;

        if((temperature < range.min || temperature > range.max) && temperature !== 0 ) return res.status(400).json({status: 'error', message: 'Color temperature value out of range'});

        let response = await bulbSrv.setBulbTemperature(bulb, temperature);
        return res.status(200).json(response);

    } catch (e) {
        next(e);
    }
}

module.exports = {
    turnBulbOnByIP: turnBulbOnByIP,
    turnBulbOffByIP: turnBulbOffByIP,
    setBulbBrightness: setBulbBrightness,
    setBulbColour: setBulbColour,
    setColourTemperature: setColourTemperature
};

