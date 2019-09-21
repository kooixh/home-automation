let client = require('../../main/client');


module.exports = function () {
    return {
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