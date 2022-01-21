const devSrv = require('../services')
const _ = require('lodash')

async function listAllDevices(req, res) {
  let response = await devSrv.getAllDevices()
  return res.status(200).json(response)
}

async function getDeviceByHost(req, res, next) {
  if (!req.params || !req.params.hasOwnProperty('host')) {
    return next(new Error('Body does not has host field.'))
  }

  try {
    let dev = await devSrv.getDevice(req.params.host)
    dev = await devSrv.extractDeviceInfo(dev)
    if (_.isEmpty(dev)) {
      return res.status(200).json({ status: 'error', message: 'no device found for host', data: { dev } })
    }
    return res.status(200).json({ status: 'success', message: 'device found', data: dev })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listAllDevices: listAllDevices,
  getDeviceByHost: getDeviceByHost,
}
