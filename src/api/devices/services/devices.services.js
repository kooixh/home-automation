const client = require('../../../server/client');
const _ = require('lodash');

const ON_POWER_STATE = 'on';
const OFF_POWER_STATE = 'off';
const DISCOVER_TIMEOUT = 500;

let { mongoConnect } = require('../../../server/mongo');

async function getAllDevices() {
    let devices = await discoverDevices();
    return {devices: devices};
}

async function discoverDevices() {
    return new Promise(async resolve => {
        let devices = [];
        //search for 500ms
        client.startDiscovery({discoveryTimeout: DISCOVER_TIMEOUT}).on('device-new', (device) => {
            devices.push(device);
        });
        setTimeout(async () => {
            let devicesInfo = await saveInDatabase(devices);
            return resolve(devicesInfo);
        }, DISCOVER_TIMEOUT);

    });
}

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
        mongoConnect((err, client) => {
            if (err) return reject(err);
            const db = client.db('home-automation');
            const col = db.collection('devices');
            _.forEach(devicesInfo, (elem) => {
                updateDevice(col, elem); //override any new discovered device
            });
            col.find().toArray((err, reply) => {
                client.close();
                return resolve(reply);
            });
        });
    }));
}

function updateDevice(collection, elem) {
    collection.findOneAndUpdate({deviceId: elem.deviceId}, {'$set': elem}, {upsert: true},
        (err, r) => {
            if (err) return reject(err);
            console.info(r);
        });
}

async function extractDeviceInfo(device) {
    let deviceSim = {
        host: device.host,
        model: device._sysInfo.model,
        description: device._sysInfo.description,
        alias: device._sysInfo.alias,
        id: device._sysInfo.deviceId
    };
    let type = await client.getTypeFromSysInfo(device._sysInfo);
    deviceSim.type = type;
    if (type === 'bulb') {
        let lightState = device._sysInfo.light_state;
        let powerState = (lightState.on_off === 0) ? OFF_POWER_STATE : ON_POWER_STATE;
        deviceSim.state = {power: powerState, lightingState: _.omit(lightState, 'on_off')};
    } else {
        let powerState = (device.lastState.inUse) ? ON_POWER_STATE : OFF_POWER_STATE;
        let onTime = device._sysInfo.on_time;
        deviceSim.state = {power: powerState, powerState: {onDuration: onTime}};
    }
    return deviceSim;
}

async function getDevice(host) {
    try {
        let device = await client.getDevice({host: host});
        let cache = [];
        // Dealing with circular object in json
        device = JSON.parse(JSON.stringify(device, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return;
                }
                cache.push(value);
            }
            return value;
        }));
        return device;
    } catch (e) {
        return {};
    }
}

module.exports = {
    getDevice: getDevice,
    getAllDevices: getAllDevices,
    extractDeviceInfo: extractDeviceInfo
};
