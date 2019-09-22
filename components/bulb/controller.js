/**
 *
 *
 * Created by Xiu Hong 21/9/2019
 *
 */
let colourUtils = require('../../utils/colout.utils');
let bulbSrv = require('./services');

module.exports = function () {

    return {
        turnBulbOnByIP: turnBulbOnByIP,
        turnBulbOffByIP: turnBulbOffByIP,
        setBulbBrightness: setBulbBrightness
    }
}();


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
    if(!req.body || !req.body.hasOwnProperty('colour')) return next(new Error('Body does not have colour field.'));

    if(!colourUtils.isHEXColour(req.body.colour)) return next(new Error('Colour has to be in hex'));
    let hex = parseInt(req.body.brightness);

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
