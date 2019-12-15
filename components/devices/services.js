const client = require('../../main/client');
const _ = require('lodash');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


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
async function discoverDevices() {
    return new Promise(async function(resolve, reject) {
        let devices = [];
        //search for 500ms
        client.startDiscovery({discoveryTimeout:500}).on('device-new', (device) => {
            devices.push(device);
        });
        setTimeout(async ()=>{
            let devicesInfo = await saveInDatabase(devices);
            console.log(devicesInfo);
            return resolve(devicesInfo);
        }, 500);


    });
}

/**
 *
 *
 *
 * @returns {Promise<void>}
 */
async function saveInDatabase(deviceList) {

    return new Promise((async (resolve, reject) => {

        let devicesInfo = await Promise.all(_.map(deviceList, async (elem) => {
            let type = await client.getTypeFromSysInfo(elem._sysInfo);
            return {
                host: elem.host,
                deviceId: elem._sysInfo.deviceId,
                type: type
            }
        }));

        MongoClient.connect(url, function(err, client) {
            if (err) throw err;
            const db = client.db('home-automation');
            const col = db.collection('devices');

            //override any new discovered device
            _.forEach(devicesInfo, (elem) => {
                col.findOneAndUpdate({deviceId: elem.deviceId},{"$set": elem}, { upsert: true }, (err, r) => {
                    if (err) return reject(err);
                    console.info(r);
                });
            });
            // retrieve all devices
            col.find().toArray((err, reply) => {
                client.close();
                return resolve(reply);
            });
        });

    }))

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
    deviceSim.id = device._sysInfo.deviceId;

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
