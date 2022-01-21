const _ = require('lodash')
const plugSrv = require('../services')

async function turnPlugOnByIP(req, res, next) {
  if (!req.body || !req.body.hasOwnProperty('host')) {
    return next(new Error('Body does not has host field.'))
  }

  let hostAddress = req.body.host
  try {
    let plug = await plugSrv.getDeviceByIP(hostAddress)
    if (plug === null) {
      return res.status(404).json({ status: 'error', message: 'Device not found for host', data: {} })
    }
    let response = await plugSrv.turnPlugOn(plug)
    return res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

async function turnPlugOffByIP(req, res, next) {
  if (!req.body || !req.body.hasOwnProperty('host')) {
    return next(new Error('Body does not has host field.'))
  }

  let hostAddress = req.body.host
  try {
    let plug = await plugSrv.getDeviceByIP(hostAddress)
    if (_.isEmpty(plug)) {
      return res.status(404).json({ status: 'error', message: 'Device not found for host', data: {} })
    }
    let response = await plugSrv.turnPlugOff(plug)
    return res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  turnPlugOnByIP: turnPlugOnByIP,
  turnPlugOffByIP: turnPlugOffByIP,
}
