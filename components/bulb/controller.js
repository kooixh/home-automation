/**
 *
 *
 * Created by Xiu Hong 21/9/2019
 *
 */
let bulbSrv = require('./services');

module.exports = function () {

    return {
        turnBulbOnByIP: turnBulbOnByIP
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
    if(!req.body || req.body.hasOwnProperty('host'))
        return next(new Error('Body does not has host field.'));

    let hostAddress = req.body.host;
    try{
        let bulb = await bulbSrv.getDeviceByIP(hostAddress);
        let response = await bulbSrv.turnBulbOn(bulb);
        return res.status(200).json(response);
    }catch (e) {
        next(e);
    }

}


