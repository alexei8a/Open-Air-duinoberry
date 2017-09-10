#include <Wire.h>
#include <UnoWiFiDevEd.h>
#include <SimpleDHT.h>
#include <SFE_BMP180.h>
#include <Wire.h>


#define CONNECTOR "mqtt"
#define TOPIC "arduinoUNOWifi/MQ7"
#define TOPIC2 "arduinoUNOWifi/DHT11"
#define TOPIC3 "arduinoUNOWifi/BMP180"

int pinDHT11 = 2;
SimpleDHT11 dht11;
SFE_BMP180 bmp180;

void setup() {
  Ciao.begin();
  Serial.begin(9600);
  if (bmp180.begin())
    Serial.println("BMP180 iniciado correctamente");
  else
  {
    Serial.println("Error al iniciar el BMP180");
    while (1); // bucle infinito
  }

}

void loop() {

  int vol = analogRead(A0); //Lee la salida analógica del MQ
  float VRL = (vol / 1023.0) * 5.0;
  float ppm = 50 * pow((((float)10000.0 / 2000.0) * ((5.0 / VRL) - 1)), -1.6) + 1.7;

  String payload = "{";
  payload += "\"CO\":";
  payload += ppm;
  payload += "}";

  Serial.println(payload);

  Ciao.write(CONNECTOR, TOPIC, payload);



  byte temperature = 0;
  byte humidity = 0;
  int err = SimpleDHTErrSuccess;
  if ((err = dht11.read(pinDHT11, &temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT11 failed, err="); Serial.println(err); delay(1000);
    return;
  }


  String payload2 = "{";
  payload2 += "\"temperatura\":";
  payload2 += (int)temperature;
  payload2 += ",";
  payload2 += "\"humedad\":";
  payload2 += (int)humidity;
  payload2 += "}";

  Serial.println(payload2);

  Ciao.write(CONNECTOR, TOPIC2, payload2);


  char status;
  double T = 0, P = 0;

  status = bmp180.startTemperature();//Inicio de lectura de temperatura
  if (status != 0)
  {
    delay(status); //Pausa para que finalice la lectura
    status = bmp180.getTemperature(T); //Obtener la temperatura
    if (status != 0)
    {
      status = bmp180.startPressure(3); //Inicio lectura de presión
      if (status != 0)
      {
        delay(status);//Pausa para que finalice la lectura
        status = bmp180.getPressure(P, T); //Obtenemos la presión
        if (status != 0)
        {

          
          String payload3 = "{";
         //payload3 += "\"presion\":";
          payload3 += "\"medidas\": [";
          payload3 += (double)P;
          payload3 += ",";
         //payload3 += "\"temp\":";
          payload3 += (double)T;
          payload3 += "]}";
         //payload3 += "}";

          Serial.println(payload3);

          Ciao.write(CONNECTOR, TOPIC3, payload3);


        }
      }
    }
  }


  delay(30000);
}





