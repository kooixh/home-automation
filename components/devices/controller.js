let devSrv = require('./services');
let _ = require('lodash');

module.exports = function () {
    return {
        listAllDevices:listAllDevices,
        getDeviceByHost: getDeviceByHost
    }
}();


/**
 *
 *
 *
 * @param req
 * @param res
 * @param send
 * @returns {Promise<void>}
 */
async function listAllDevices(req, res, send) {
    let response = await devSrv.getAllDevices();
    res.status(200).json(response);
};


/**
 *
 * GET an individual device information
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function getDeviceByHost(req,res,next) {

    if(!req.params || !req.params.hasOwnProperty('host'))
        return next(new Error('Body does not has host field.'));


    try{
        let dev = await devSrv.getDevice(req.params.host);
        dev = await devSrv.extractDeviceInfo(dev);
        if(_.isEmpty(dev))
            return res.status(200).json({status: 'error', message: 'No device found for host', data: {dev}});

        return res.status(200).json({status: 'success', message: 'device found', data: dev});
    }catch (e) {
        next(e);
    }

}