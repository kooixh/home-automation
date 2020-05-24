const client = require('../../server/client');


async function getDeviceByIP(host) {

    return new Promise(async (resolve, reject) => {
        try {
            let bulb = await client.getDevice({host: host});
            if (await client.getTypeFromSysInfo(bulb._sysInfo === 'bulb'))
                resolve(bulb);

            reject(new Error('Device is not a bulb'));
        } catch (e) {
            reject(new Error('Device is not found'));
        }

    });

}

async function turnBulbOn(bulb) {
    await bulb.setPowerState(true);
    return {'message': bulb.alias+' switched on', status: 'success'};
}

async function turnBulbOff(bulb) {
    await bulb.setPowerState(false);
    return {'message': bulb.alias+' switched off', status: 'success'};
}

async function setBulbBrightness(bulb, brightness) {
    await bulb.lighting.setLightState({brightness: brightness});
    return {'message': bulb.alias+' brightness set to '+brightness, status: 'success'};
}

async function setBulbColour(bulb, hsv) {

    let hue = hsv[0];
    let saturation = hsv[1];
    let value = hsv[2];

    // 4000 for white light, 0 to get rgb colour
    let temperature = (hue === 0 && saturation === 0) ? 4000 : 0;
    await bulb.lighting.setLightState({hue: hue, saturation: saturation,brightness: value, color_temp:temperature});
    return {'message': bulb.alias+' colour set to HSV '+hue+' '+saturation+' '+value, status: 'success'};
}

async function setBulbTemperature(bulb, temperature) {

    await bulb.lighting.setLightState({color_temp:temperature});
    return {'message': bulb.alias+' colour temperature set to '+ temperature, status: 'success'};
}


module.exports = {
    getDeviceByIP: getDeviceByIP,
    turnBulbOn:turnBulbOn,
    turnBulbOff: turnBulbOff,
    setBulbBrightness: setBulbBrightness,
    setBulbColour: setBulbColour,
    setBulbTemperature: setBulbTemperature
};
