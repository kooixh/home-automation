let client = require('../../main/client');


module.exports = function(){

    return {
        getDeviceByIP: getDeviceByIP,
        turnPlugOn:turnPlugOn,
        turnPlugOff: turnPlugOff,
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

    return new Promise(async (resolve, reject) => {
        try {
            let plug = await client.getDevice({host: host});
            if (await client.getTypeFromSysInfo(plug._sysInfo === 'plug'))
                resolve(plug);

            reject(new Error('Device is not a plug'));
        } catch (e) {
            console.log(e);
            reject(new Error('Device is not found'));
        }

    });

}

/**
 *
 *
 *
 * @param bulb
 * @returns {Promise<{message: string, status: string}>}
 */
async function turnPlugOn(plug) {
    await plug.setPowerState(true);
    return {'message': plug.alias+' switched on', status: 'success'};
}

/**
 *
 *
 *
 * @param bulb
 * @returns {Promise<{message: string, status: string}>}
 */
async function turnPlugOff(plug) {
    await plug.setPowerState(false);
    return {'message': plug.alias+' switched off', status: 'success'};
}
