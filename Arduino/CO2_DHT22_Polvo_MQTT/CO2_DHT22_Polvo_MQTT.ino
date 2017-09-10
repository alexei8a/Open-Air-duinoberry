#include <Wire.h>
#include <UnoWiFiDevEd.h>
#include <SimpleDHT.h>
#include <Wire.h>

#define CONNECTOR "mqtt"
#define TOPIC "arduinoUNOWifi/MQ135"
#define TOPIC2 "arduinoUNOWifi/DHT22"
#define TOPIC3 "arduinoUNOWifi/GP2Y1010AU0F"

int pinDHT22 = 4;
SimpleDHT22 dht22;

int measurePin = 1; //Connect dust sensor to Arduino A1 pin
int ledPower = 3;   //Connect 3 led driver pins of dust sensor to Arduino D2
 
int samplingTime = 280;
int deltaTime = 40;
int sleepTime = 9680;
 
float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;
 

void setup() {
  Ciao.begin();
  Serial.begin(9600);
  pinMode(ledPower,OUTPUT);
}

void loop() {
  
  int mq135_adc = analogRead(A0);
  float mq135_voltaje = mq135_adc * (5.0 / 1023.0);
  float mq135_resistencia = 1000*((5-mq135_voltaje)/mq135_voltaje);
  double dioxidoDeCarbono = 245*pow(mq135_resistencia/5463, -2.26);
  double oxidosDeNitrogeno = 132.6*pow(mq135_resistencia/5463, -2.74);
  double amoniaco = 161.7*pow(mq135_resistencia/5463, -2.26);

           String payload = "{";
           payload += "\"CO2\":";
           payload += dioxidoDeCarbono;
           payload += ",";
           payload += "\"NOx\":";
           payload += oxidosDeNitrogeno;
           payload += ",";
           payload += "\"NH3\":";
           payload += amoniaco;
           payload += "}";
       Serial.println(payload);

  Ciao.write(CONNECTOR, TOPIC, payload);



  float temperature = 0;
  float humidity = 0;
  int err = SimpleDHTErrSuccess;
  if ((err = dht22.read2(pinDHT22, &temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT22 failed, err="); Serial.println(err);delay(2000);
    return;
  }
  
  Serial.print("Sample OK: ");

  String payload2 = "{";
  payload2 += "\"temperatura\":";
  payload2 += (float)temperature;
  payload2 += ",";
  payload2 += "\"humedad\":";
  payload2 += (float)humidity;
  payload2 += "}";

  Serial.println(payload2);
  Ciao.write(CONNECTOR, TOPIC2, payload2);



  digitalWrite(ledPower,LOW); // power on the LED
  delayMicroseconds(samplingTime);
  voMeasured = analogRead(measurePin); // read the dust value 
  delayMicroseconds(deltaTime);
  digitalWrite(ledPower,HIGH); // turn the LED off
  delayMicroseconds(sleepTime);
 
  // 0 - 5V mapped to 0 - 1023 integer values
  // recover voltage
  calcVoltage = voMeasured * (5.0 / 1024.0);
 
  // linear eqaution taken from http://www.howmuchsnow.com/arduino/airquality/
  // Chris Nafis (c) 2012
  dustDensity = 0.17 * calcVoltage - 0.1;
 
  Serial.print("Raw Signal Value (0-1023): ");
  Serial.print(voMeasured);
 
  Serial.print(" - Voltage: ");
  Serial.print(calcVoltage);
 Serial.println();
  String payload3 = "{";
  payload3 += "\"densidad de polvo\":";
  payload3 += dustDensity; 
  payload3 += "}";

   Serial.println(payload3);
           
  Ciao.write(CONNECTOR, TOPIC3, payload3);

 
  delay(30000);
}


 


