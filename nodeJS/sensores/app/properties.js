/**
 * Description
 * @method selectProperties
 * @param {} deviceName
 * @return properties
 */
function selectProperties(deviceName){
	switch(deviceName)
	{
	case "Arduino UNO":
		var	properties={"sensor1":"GPS Neo-6M"};
		break;
	case "Arduino UNO Wifi":
		var	properties={"sensor1":"DHT11","sensor2":"BMP180","sensor3":"MQ7"};
		break;
	case "Arduino UNO Wifi 2":
		var	properties={"sensor1":"DHT22","sensor2":"MQ135","sensor3":"GP2Y1010AU0F"};
		break;

	default: 
		var properties={};
		break;
	}

	return properties;

}	
exports.selectProperties=selectProperties;

