
# home-automation REST api for tp-link devices

A Rest API with endpoints to perform operations on TP-Link smart home devices.

## Supported devices

Plug - HS100, HS103, HS105, HS107, HS110, HS200, HS220, HS300

Bulb - LB100, LB110, LB120, LB130, LB200, LB230

## Requires

* NodeJS
* npm
* Express

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
	"message": "Living room light switched off",
	"status": "success"
}
```
