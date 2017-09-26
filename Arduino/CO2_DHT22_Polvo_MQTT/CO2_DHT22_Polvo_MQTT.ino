#include <Wire.h>
#include <UnoWiFiDevEd.h>
#include <SimpleDHT.h>
#include <Wire.h>

#define CONNECTOR "mqtt"
#define TOPIC "arduinoUNOWifi/MQ135"
#define TOPIC2 "arduinoUNOWifi/DHT22"
#define TOPIC3 "arduinoUNOWifi/GP2Y1010AU0F"

int pinDHT22 = 4; //Conectar el sensor DHT22 al pin D4 
SimpleDHT22 dht22;

int measurePin = 1; //Conectar la salida del sensor de polvo al pin A1 de la Arduino 
int ledPower = 3;   //Conectar el pin que controla el LED del sensor de polvo a la entrada D3 de la Arduino
 


void setup() {
  Ciao.begin();
  Serial.begin(9600);
  pinMode(ledPower,OUTPUT);
}

void loop() {

//Se hacen 5 mediciones para evitar valores extremos causados por perturbaciones 
  float sum2=0;
  for (int i=0;i<=4;i++){
  sum2=sum2+getVoltaje();  
  }
 
  float mq135_voltaje=sum2/5;
  float mq135_resistencia = 2000*((5-mq135_voltaje)/mq135_voltaje);
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


 //Se hacen 5 mediciones para evitar valores extremos causados por perturbaciones 
  float sum=0;
  for (int i=0;i<=4;i++){
  sum=sum+getDustDensity();  
  }
  
  float dustDensity=sum/5;
  String payload3 = "{";
  payload3 += "\"densidad de polvo\":";
  payload3 += dustDensity; 
  payload3 += "}";

   Serial.println(payload3);
           
  Ciao.write(CONNECTOR, TOPIC3, payload3);

 
  delay(30000);
}

//Función que retorna el voltaje medido por el MQ135
float getVoltaje(){
  int mq135_adc = analogRead(A0);
  float mq135_voltaje = mq135_adc * (5.0 / 1023.0); // leer el valor análogo del sensor MQ135 conectado al pin A0
  return mq135_voltaje;
}

//Función que retorna la densidad de polvo en el aire
float getDustDensity(){  
  int samplingTime = 280;
  int deltaTime = 40;
  int sleepTime = 9680;
  float voMeasured = 0;
  float calcVoltage = 0;
  float dustDensity = 0;
  digitalWrite(ledPower,LOW); // encender el LED
  delayMicroseconds(samplingTime);
  voMeasured = analogRead(measurePin); // leer el valor análogo del sensor GP2Y1010AU0F conectado al pin A1
  delayMicroseconds(deltaTime);
  digitalWrite(ledPower,HIGH); // apagar el LED 
  delayMicroseconds(sleepTime);
 
  // Convierte las medidas análogas de 0 - 5V en valores enteros de 0 - 1023 
  // recupera el voltaje
  calcVoltage = voMeasured * (5.0 / 1024.0);
 
  // Ecuación lineal tomada de http://www.howmuchsnow.com/arduino/airquality/
  dustDensity = 0.17 * calcVoltage - 0.1;
 
  Serial.print("Raw Signal Value (0-1023): ");
  Serial.print(voMeasured);
 
  Serial.print(" - Voltage: ");
  Serial.print(calcVoltage);
  Serial.println();
  return dustDensity;
}


 


