
var mongodb  = require("mongodb");
var mqtt     = require("mqtt");
var Sensor= require("./models/sensors");
var express = require("express");
var mailer = require("express-mailer");
var mqttUri  = "mqtt://localhost:1883";
var client   = mqtt.connect(mqttUri);
var deviceRoot = "arduinoUNOWifi";
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';

var pa="56d681c27824";
var pa2=decrypt(pa);



/**
 * Description
 * @method encrypt
 * @param {} text
 * @return crypted
 */
function encrypt(text){
	var cipher = crypto.createCipher(algorithm,password)
			var crypted = cipher.update(text,'utf8','hex')
			crypted += cipher.final('hex');
	return crypted;
}

/**
 * Description
 * @method decrypt
 * @param {} text
 * @return dec
 */
function decrypt(text){
	var decipher = crypto.createDecipher(algorithm,password)
			var dec = decipher.update(text,'hex','utf8')
			dec += decipher.final('utf8');
	return dec;
}


var app=express();



app.set("view engine","jade");

 mailer.extend(app, {
      from: "Alekos",
      host: "smtp.gmail.com", // hostname 
      secureConnection: true, // use SSL 
      port: 465, // port for secure SMTP 
      transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts 
      auth: {
        user: "alexei8a@gmail.com", // email id
        pass: pa2  // password
      }
    });

client.on("connect", function () {
    client.subscribe(deviceRoot+"/MQ7");
    client.subscribe(deviceRoot+"/DHT11");
    client.subscribe(deviceRoot+"/BMP180");
    client.subscribe(deviceRoot+"/MQ135");
    client.subscribe(deviceRoot+"/DHT22");
    client.subscribe(deviceRoot+"/GP2Y1010AU0F");
    console.log("Suscrito a los 6 tópicos");
});

var mongoUri = "mongodb://localhost:27017/sensores";

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{
    	
	client.on("message", function (topic,payload) { 
	console.log("mensaje");	
	var key=topic.replace(deviceRoot+"/","");
	var collection = db.collection(key);
	var valores = JSON.parse(payload);
	
	
	
	generateAlert(key,valores);
	
	
	
	
	 var collection2 = db.collection("sensors");
	 collection2.findOne({title:key}, function(err,doc){
	if(!err)
	{
  collection.update(  
  { creator:doc._id },
    {$push:  {values:valores, when:new Date() }}  ,
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
});
}}); 


/**
 * Description
 * @method generateAlert
 * @param {} key
 * @param {} valores
 * @return 
 */
function generateAlert(key,valores){
	if(key=="MQ7") 
	{
		var m=valores["CO"];
		if(m>30){
		sendMailAlert("Exceso de monóxido de carbono en el aire",valores,key);
	
		}
	}
	
	
		if(key=="BMP180") 
	{
		var m=valores["medidas"][1];
		if(m>50){
		sendMailAlert("Exceso de temperatura",valores,key);
		}
		if(m<5){
		sendMailAlert("La temperatura es muy baja",valores,key);
		}
	}
	
		if(key=="DHT22") 
	{
		var m=valores["humedad"];
		if(m>60){
		sendMailAlert("Exceso de humedad en el aire",valores,key);
		}
	}
	
	
	if(key=="MQ135") 
	{
		var m=valores["CO2"];
		if(m>1500){
		sendMailAlert("Exceso de dióxido de carbono en el aire",valores,key);
		}
	}
	
	
	if(key=="GP2Y1010AU0F") 
	{
		var m=valores["densidad de polvo"];
		if(m>0.4){
		sendMailAlert("Exceso de material particulado en el aire",valores,key);
		}
	}
	return;
}

/**
 * Description
 * @method sendMailAlert
 * @param {} subj
 * @param {} data
 * @param {} key
 * @return 
 */
function sendMailAlert(subj,data,key){
	var values = JSON.stringify(data);
	console.log(values);
	 app.mailer.send("email", //view engine i.e template name
          {
          to: "agochoad@unal.edu.co",      // REQUIRED. This can be a comma delimited string just like a normal email to field.  
           subject: subj, // REQUIRED.    
           data: values,
           key: key,   
          }, function (err) {
               if (err) {
                              console.log(err);
                              res.send("Hubo un error enviando el email "+err); 
                              return;
                           } 
                            });
	
}



app.listen("9999"/*, "192.168.0.77"*/);
  console.log('Servidor en línea: http://localhost:9999');
