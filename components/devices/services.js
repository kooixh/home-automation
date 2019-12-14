const client = require('../../main/client');
const _ = require('lodash');





/**
 *
 *
 *
 * @returns {Promise<void>}
 */
async function getAllDevices() {
    let devices = await discoverDevices();
    return {devices: devices};
}

/**
 *
 *
 *
 * @returns {Promise<unknown>}
 */
function discoverDevices() {
    return new Promise(function(resolve, reject) {
        let devices = [];
        //search for 500ms
        client.startDiscovery({discoveryTimeout:500}).on('device-new', async (device) => {
            devices.push(await extractDeviceInfo(device));
        });
        setTimeout(()=>{
            return resolve(devices);
        }, 500);
    });
}

/**
 *
 *
 *
 * @param device
 */
async function extractDeviceInfo(device) {
    let deviceSim = {};
    deviceSim.host = device.host;
    deviceSim.model = device._sysInfo.model;
    deviceSim.description = device._sysInfo.description;
    deviceSim.alias = device._sysInfo.alias;


    let type = await client.getTypeFromSysInfo(device._sysInfo);
    deviceSim.type = type;

    if (type === 'bulb') {
        let lightState = device._sysInfo.light_state;
        let powerState = (lightState.on_off === 0) ? 'off' : 'on';

        deviceSim.state = {power: powerState, lightingState: _.omit(lightState, 'on_off')};
    } else {
        let powerState = (device.lastState.inUse) ? 'on' : 'off';

        let onTime = device._sysInfo.on_time;
        deviceSim.state = {power: powerState, powerState: {onDuration: onTime}};
    }



    return deviceSim;

}

/**
 *
 *
 * Getting an individual device using host
 *
 * @param host
 * @returns {Promise<*|Error|{}>}
 */
async function getDevice(host) {

    try{
        let device = await client.getDevice({host: host});
        let cache = [];

        // Dealing with circular object in json
        device = JSON.parse(JSON.stringify(device, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return;
                }
                cache.push(value);
            }
            return value;
        }));

        return device;
    } catch(e) {
        return {};
    }

}


module.exports = {
    getDevice:getDevice,
    getAllDevices:getAllDevices,
    extractDeviceInfo:extractDeviceInfo
};