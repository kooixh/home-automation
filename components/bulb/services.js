let client = require('../../main/client');


module.exports = function(){

    return {
        getDeviceByIP: getDeviceByIP,
        turnBulbOn:turnBulbOn
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

    let bulb = await client.getDevice({host: host});
    return bulb;

}


async function turnBulbOn(bulb) {
    await bulb.setPowerState(true);
    return {'message': bulb.alias+' switched on', status: 'success'};
}