const client = require('../../server/client');

async function getDeviceByIP(host) {
    return new Promise(async (resolve, reject) => {
        try {
            let plug = await client.getDevice({host: host});
            return (await client.getTypeFromSysInfo(plug._sysInfo) === 'plug') ? resolve(plug) :
                reject(new Error('Device is not a plug'));
        } catch (e) {
            console.log(e);
            reject(new Error('Device is not found'));
        }

    });
}

async function turnPlugOn(plug) {
    await plug.setPowerState(true);
    return {
        message: plug.alias + ' switched on', status: 'success'
    };
}

async function turnPlugOff(plug) {
    await plug.setPowerState(false);
    return {
        message: plug.alias + ' switched off',
        status: 'success'
    };
}

module.exports = {
    getDeviceByIP: getDeviceByIP,
    turnPlugOn:turnPlugOn,
    turnPlugOff: turnPlugOff,
};
