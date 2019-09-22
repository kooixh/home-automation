
# home-automation REST api for tp-link devices

A Rest API with endpoints to perform operations on TP-Link smart home devices.

## Supported devices

Plug - HS100, HS103, HS105, HS107, HS110, HS200, HS220, HS300

Bulb - LB100, LB110, LB120, LB130, LB200, LB230

## Requires

* [NodeJS](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [ExpressJS](https://expressjs.com/)

## Dependency

[tplink-smarthome-api](https://github.com/plasticrake/tplink-smarthome-api)


## Endpoints

### Devices
**GET /devices/list**

List all devices

Response body:
```json
{
    "devices": [
        {
            "name": "Living room light",
            "host": "12.11.0.100"
        }
    ]
}
```

**GET /devices/ip/:host**

Get a device using host address

Response body:
```json
{
    "status": "success",
    "message": "device found",
    "data": {
        "_events": {},
        "_eventsCount": 0,
        "client": {
            "_events": {},
            "_eventsCount": 0,
            "defaultSendOptions": {
                "timeout": 10000,
                "transport": "tcp"
            },
            "log": {
                "levels": {
                    "TRACE": 0,
                    "DEBUG": 1,
                    "INFO": 2,
                    "WARN": 3,
                    "ERROR": 4,
                    "SILENT": 5
                }
            },
            "devices": {},
            "discoveryTimer": null,
            "discoveryPacketSequence": 0
        },
        "host": "12.11.0.100",
        "port": 9999,
        "lastState": {
            "powerOn": null,
            "inUse": null
        },
        "_sysInfo": {
            "sw_ver": "1.8.6 Build 180809 Rel.091659",
            "hw_ver": "1.0",
            "model": "LB130(EU)",
            "description": "Smart Wi-Fi LED Bulb with Color Changing",
            "alias": "Living room light",
            "mic_type": "IOT.SMARTBULB",
            "dev_state": "normal",
            "mic_mac": "AC84C68641ED",
            "deviceId": "8012DE62E60B20FCA53FF9767E0B46691A225F67",
            "oemId": "D5C424D3C480911C980ECDD56C27988F",
            "hwId": "111E35908497A05512E259BB76801E10",
            "is_factory": false,
            "disco_ver": "1.0",
            "ctrl_protocols": {
                "name": "Linkie",
                "version": "1.0"
            },
            "light_state": {
                "on_off": 0,
                "dft_on_state": {
                    "mode": "normal",
                    "hue": 0,
                    "saturation": 0,
                    "color_temp": 4000,
                    "brightness": 100
                }
            },
            "is_dimmable": 1,
            "is_color": 1,
            "is_variable_color_temp": 1,
            "preferred_state": [
                {
                    "index": 0,
                    "hue": 0,
                    "saturation": 0,
                    "color_temp": 2700,
                    "brightness": 50
                },
                {
                    "index": 1,
                    "hue": 0,
                    "saturation": 75,
                    "color_temp": 0,
                    "brightness": 100
                },
                {
                    "index": 2,
                    "hue": 120,
                    "saturation": 75,
                    "color_temp": 0,
                    "brightness": 100
                },
                {
                    "index": 3,
                    "hue": 240,
                    "saturation": 75,
                    "color_temp": 0,
                    "brightness": 100
                }
            ],
            "rssi": -42,
            "active_mode": "none",
            "heapsize": 291404,
            "err_code": 0
        },
        "netif": {
            "apiModuleName": "netif"
        },
        "supportsEmeter": true,
        "apiModuleNamespace": {
            "system": "smartlife.iot.common.system",
            "cloud": "smartlife.iot.common.cloud",
            "schedule": "smartlife.iot.common.schedule",
            "timesetting": "smartlife.iot.common.timesetting",
            "emeter": "smartlife.iot.common.emeter",
            "netif": "netif",
            "lightingservice": "smartlife.iot.smartbulb.lightingservice"
        },
        "cloud": {
            "apiModuleName": "smartlife.iot.common.cloud"
        },
        "emeter": {
            "apiModuleName": "smartlife.iot.common.emeter",
            "childId": null,
            "_realtime": {}
        },
        "lighting": {
            "apiModuleName": "smartlife.iot.smartbulb.lightingservice",
            "_lastState": {
                "powerOn": false
            }
        },
        "schedule": {
            "apiModuleName": "smartlife.iot.common.schedule",
            "childId": null
        },
        "time": {
            "apiModuleName": "smartlife.iot.common.timesetting"
        }
    }
}
```


### Bulbs


**POST /bulb/ip/turnOn**

Turn on bulb using the host address

Request body:
```json
{
	"host": "12.11.0.100"
}
```


Response body:
```json
{
	"message": "Living room light switched on",
	"status": "success"
}
```

**POST /bulb/ip/turnOff**

Turn off bulb using the host address

Request body:
```json
{
	"host": "12.11.0.100"
}
```


Response body:
```json
{
	"message": "Living room light switched off",
	"status": "success"
}
```

**POST /bulb/ip/brightness**

Set the brightness of a bulb using the host address

Request body:
```json
{
  "host": "12.11.0.100",
  "brightness": "20"
}
```


Response body:
```json
{
	"message": "Living room light brightness set to 20",
	"status": "success"
}
```

**POST /bulb/ip/color**

Set the color of a bulb by hex value using the host address

Request body:
```json
{
  "host": "12.11.0.100",
  "color": "2BFF24"
}
```


Response body:
```json
{
	"message": "Living room light colour set to HSV 118 86 100",
	"status": "success"
}
```

**POST /bulb/ip/colorTemperature**

Set the color temperature of a bulb using the host address

Request body:
```json
{
  "host": "12.11.0.100",
  "temperature": "4000"
}
```


Response body:
```json
{
	"message": "Living room light colour temperature set to 4000",
	"status": "success"
}
```
