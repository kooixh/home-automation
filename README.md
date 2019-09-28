
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
        "host": "12.11.0.100",
        "model": "LB130(EU)",
        "description": "Smart Wi-Fi LED Bulb with Color Changing",
        "alias": "Living room light",
        "type": "bulb",
        "state": {
            "power": "on",
            "on_state": {
                "mode": "normal",
                "hue": 0,
                "saturation": 0,
                "color_temp": 4000,
                "brightness": 100
            }
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
