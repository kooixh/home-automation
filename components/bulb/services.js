let client = require('../../main/client');


module.exports = function(){

    return {
        getDeviceByIP: getDeviceByIP,
        turnBulbOn:turnBulbOn,
        turnBulbOff: turnBulbOff,
        setBulbBrightness: setBulbBrightness,
        setBulbColour: setBulbColour
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

/**
 *
 *
 *
 * @param bulb
 * @param brightness
 * @returns {Promise<void>}
 */
async function setBulbBrightness(bulb, brightness) {
    await bulb.lighting.setLightState({brightness: brightness});
    return {'message': bulb.alias+' brightness set to '+brightness, status: 'success'};
}


/**
 *
 *
 *
 * @param bulb
 * @param brightness
 * @returns {Promise<void>}
 */
async function setBulbColour(bulb, hsv) {

    let hue = hsv[0];
    let saturation = hsv[1];
    let value = hsv[2];

    // 4000 for white light, 0 to get rgb colour
    let temperature = (hue === 0 && saturation === 0) ? 4000 : 0;
    await bulb.lighting.setLightState({hue: hue, saturation: saturation,brightness: value, color_temp:temperature});
    return {'message': bulb.alias+' colour set to HSV '+hue+' '+saturation+' '+value, status: 'success'};
}
