<h1 align="center">
  Open-Air-duinoberry
</h1>
Sistema IoT que hace interoperables datos provenientes de sensores heterogéneos
<br><br>
<p align="center">
  <img src="/nodeJS/sensores/public/img/airduinoberry.png">
  <br><br>
</p>

## Tabla de contenido ##
  - [Introducción](#introducción)
  - [Materiales](#materiales)
  - [Envía tu código a GitHub.com](#envía-tu-código-a-githubcom)
  - [Tomando código desde GitHub.com](#tomando-código-desde-githubcom)
  - [¡Hora de celebrar!](#hora-de-celebrar)
  - [Wiki](#wiki)
  
  ## Introducción ##

<p align="justify">
  Esta es una iniciativa, basada en el software y el hardware libre, que hace interoperables los datos de sensores heterogéneos en el marco de Internet de las Cosas
  <br><br>
   Aquí se presenta un sistema de medición y monitoreo de algunas de las variables ambientales relacionadas con la calidad del aire, a saber: temperatura, humedad, presión atmosférica, densidad de polvo y concentraciones de monóxido y dióxido de carbono, metano y óxidos de nitrógeno. 
   <br><br>
Los datos capturados por los sensores son integrados mediante el microcontrolador central de una tarjeta Arduino, la cual establece comunicación Wifi con un servidor Web, embebido en una Raspberry Pi 3, que mediante el uso del protocolo MQTT y el entorno de ejecución para JavaScript, NodeJS, facilita la inserción de los datos en una base de datos de MongoDB, con la cual se interactúa desde el servidor utilizando el lenguaje de intercambio JSON para hacer interopreables los datos. 
   <br><br>
Además, el servidor implementa métodos para el tratamiento y visualización de datos por medio de un cliente basado en un navegador Web, lo cual hace que sean visibles desde diversidad de dispositivos.
  </p>
  
  ## Materiales ##
<p align="justify">
  Para el desarrollo de este proyecto se utilizan los siguientes materiales:
  </p>
 

| Dispositivo | Comunicación utilizada | Más info |
| ----- | ----- | ----- |
| Arduino UNO Wifi I | MQTT | https://store.arduino.cc/usa/arduino-uno-wifi |
| Arduino UNO Wifi II | MQTT | https://store.arduino.cc/usa/arduino-uno-wifi |
| Arduino UNO | Comunicación serial | https://store.arduino.cc/usa/arduino-uno-rev3 |
| Raspberry pi 3 | Wifi | https://www.raspberrypi.org/products/raspberry-pi-3-model-b/ |


Los siguientes sensores son conectados a la tarjeta Arduino UNO Wifi I

| Sensor|  Variables medidas|
| ----- | ---- |
| MQ7 |  Concentración de monóxido de carbono |
| DHT11 | Temperatura y humedad relativa |
| BMP180 | Presión atmosférica y temperatura |

A continuación se muestran los sensores conectados a la tarjeta Arduino UNO Wifi II

| Sensor|  Variables medidas|
| ----- |  ---- |
| DHT22 |  Temperatura y humedad relativa |
| MQ135 |  Concentraciones de dióxido de carbono, óxidos de nitrógeno y amoniaco |
| GP2Y1010AU0F | Densidad de polvo |

Finalmente, el siguiente sensor se conecta a la Tarjeta Arduino UNO

| Sensor | Variables medidas|
| ----- | ---- |
| GPS Neo-6M |  Latitud y longitud |

  
  
  ## Wiki ##
  
En este enlace encuentras la [Wiki con la documentación del proyecto](https://github.com/alexei8a/Open-Air-duinoberry/wiki)



  <br><br>

<footer  style="font-size: xx-small">
						<div align="center">
							<a href="mailto:agochoad@unal.edu.co" style="font-size: small">Contacto</a>
							<br>
								<a rel="license" href="http://creativecommons.org/licenses/by/4.0/" >
									<img alt="Licencia Creative Commons" style="border-width:0;width:60px;height:auto" src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
								</a>
								<br />
									Esta obra está bajo una <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
									Licencia Creative Commons Atribución 4.0 Internacional
								</a>.
							</br>
						</div>
					</footer>
