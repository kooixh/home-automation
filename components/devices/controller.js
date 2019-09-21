let devSrv = require('./services');

module.exports = function () {
    return {
        listAllDevices:listAllDevices
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