let client = require('../../main/client');


module.exports = function () {
    return {
        getDevice:getDevice,
        getAllDevices:getAllDevices
    }
}();


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
        client.startDiscovery({discoveryTimeout:500}).on('device-new', (device) => {
            devices.push({name: device.alias, host: device.host});
        });
        setTimeout(()=>{
            resolve(devices);
        }, 500);
    });
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