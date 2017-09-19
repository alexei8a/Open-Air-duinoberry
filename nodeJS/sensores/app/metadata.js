/**
 * Description
 * @method selectMetadata
 * @param {} sensorName
 * @return metadata
 */
function selectMetadata(sensorName){
	switch(sensorName)
	{
	case "DHT11":
	case "dht11":
		var	metadata={"field1":"temperatura", "unit1":"celsius",  "accuracy1":"+/-2 °C", "principle1":"NTC","field2":"humedad", "unit2":"porcentaje", "accuracy2":"+/-5%", "principle2":"resistivo", "supplyVoltage":"5V"};
		break;
	case "DHT22":
	case "dht22":
		var	metadata={"field1":"temperatura", "unit1":"celsius",  "accuracy1":"+/-0.5 °C", "principle1":"capacitivo","field2":"humedad", "unit2":"porcentaje", "accuracy2":"+/-2%", "principle2":"capacitivo", "supplyVoltage":"5V"};
		break;
	case "BMP180":
	case "bmp180":
		var	metadata={"field1":"presión", "unit1":"hPa",  "accuracy1":"+/-0.12 hPa", "principle1":"piezo-resistivo","field2":"temperatura", "unit2":"celsius", "accuracy2":"+/-0.5C", "principle2":"resistivo", "supplyVoltage":"3.3V"};
		break;
	case "MQ7":
	case "mq7":
		var	metadata={"field1":"CO", "unit1":"ppm",  "accuracy1":"variable de acuerdo a la resistencia de carga", "principle1":"resistivo", "supplyVoltage":"PWM 5VH-1.4VL"};
		break;
	case "MQ135":
	case "mq135":
		var	metadata={"field1":"CO2", "unit1":"ppm", "field2":"NOx", "unit2":"ppm","field3":"NH3", "unit3":"ppm",  "accuracy":"variable de acuerdo a la resistencia de carga", "principle":"resistivo", "supplyVoltage":"5V"};
		break;
	case "GP2Y1010AU0F":
	case "gp2y1010au0f":
		var	metadata={"field1":"densidad de polvo", "unit1":"mg/m3",  "accuracy1":"+/-0.1 mg/m3", "principle1":"óptico", "supplyVoltage":"5V"};
		break;
	case "GPS Neo-6M":
	case "gps neo-6m":
		var	metadata={"field":"ubicación (latitud-longitud)", "unit":"m",  "accuracy":"3 m", "principle":"Comunicación satelital","canales":"50", "update frequency":"5Hz", "interfaces":"UART, USB, SPI", "dynamics":"si", "format":"grados decimales", "supplyVoltage":"3.3V"};
		break;

	default: 
		var metadata={};
		break;
	}

	return metadata;

}	
exports.selectMetadata=selectMetadata;

