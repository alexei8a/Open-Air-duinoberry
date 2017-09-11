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
  - [Configura tu proyecto en GitHub Desktop](#configura-tu-proyecto-en-github-desktop)
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
