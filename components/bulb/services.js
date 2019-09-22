let client = require('../../main/client');


module.exports = function(){

    return {
        getDeviceByIP: getDeviceByIP,
        turnBulbOn:turnBulbOn,
        turnBulbOff: turnBulbOff
    }

}();


/**
 *
 *
 * get the bulb using the host address
 *
 * @param host
 * @returns {Promise<Error>}
 */
async function getDeviceByIP(host) {
    try {
        let bulb = await client.getDevice({host: host});
        return bulb;
    } catch (e) {
        return null;
    }
}

/**
 *
 *
 *
 * @param bulb
 * @returns {Promise<{message: string, status: string}>}
 */
async function turnBulbOn(bulb) {
    await bulb.setPowerState(true);
    return {'message': bulb.alias+' switched on', status: 'success'};
}

/**
 *
 *
 *
 * @param bulb
 * @returns {Promise<{message: string, status: string}>}
 */
async function turnBulbOff(bulb) {
    await bulb.setPowerState(false);
    return {'message': bulb.alias+' switched off', status: 'success'};
}