/**
 *
 *
 * Created by Xiu Hong 21/9/2019
 *
 */
let bulbSrv = require('./services');

module.exports = function () {

    return {
        turnBulbOnByIP: turnBulbOnByIP,
        turnBulbOffByIP: turnBulbOffByIP
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

