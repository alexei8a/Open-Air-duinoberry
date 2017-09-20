var express = require("express");
var mongo  = require("mongodb");
var path = require('path');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var methodOver = require("method-override");
var path = require("path");
var logger = require('morgan');


var dbHost = "mongodb://localhost:27017/sensores";
var dbObject;
var dbClient = mongo.MongoClient;
var observed;

mongo.MongoClient.connect(dbHost, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("observedProperties");
  	 collection.findOne({_id:"observedProperties"}, function(err,doc){
	if(!err)
	{
	observed=doc;
}
}); 
}
});


dbClient.connect(dbHost,function(err,db){
	if(err) throw err; 
	dbObject = db;
});




/**
 * Description
 * @method getDataMQ7
 * @param {} responseObj
 * @return 
 */
function getDataMQ7(responseObj){
	observedMQ7=observed;
	observedMQ7.name=["concentración de CO"];
	dbObject.collection("MQ7").find({}).toArray(function(err, docs){
	if( err ) throw err;
	var timesArray=[];
	var valuesArray=[];	

	for(index in docs){
		doc = docs[index];
		var timeTmp = doc['resultTime'];
		var valuesTmp = doc['result'];
		for(index2  in valuesTmp){
			sample = valuesTmp[index2];
			var COvalue = sample["CO"];
			valuesArray.push(COvalue);
		}
		timesArray = timeTmp;
	}
	var dataset ={
        "seriesname" : "CO",
        "description" : "medición de concentración de monóxido de carbono en el aire",
        "unitOfMeasurement": "ppm",
        "sensor": "MQ7",
        "observedProperty": observedMQ7,
        "observationType": "periódica",
        "data" : valuesArray,
        "categories" : timesArray
      };
     
     
	mongo.MongoClient.connect(dbHost, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("datastreamMQ7");
  collection.update(  
  { _id: "datasetreamMQ7"},
  { _id: "datasetreamMQ7", "seriesname" : dataset.seriesname, "description" :  dataset.description, "unitOfMeasurement": dataset.unitOfMeasurement, "sensor": dataset.sensor, "observedProperty": dataset.observedProperty, "observationType": dataset.observationType , observation: { result:dataset.data, resultTime:dataset.categories } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
      
	var response = {"dataset" : dataset};
	responseObj.json(response);
	});
}
/**
 * Description
 * @method getDataDHT
 * @param {} responseObj
 * @param {} sensor
 * @return 
 */
function getDataDHT(responseObj,sensor){
	observedDHT=observed;
	observedDHT.name=["temperatura","humedad"];
	dbObject.collection(sensor).find({}).toArray(function(err, docs){
	if( err ) throw err;
	var timesArray=[];
	var tempArray=[];	
	var humArray=[];	
	for(index in docs){
		doc = docs[index];
		var timeTmp = doc['resultTime'];
		var valuesTmp = doc['result'];
		for(index2  in valuesTmp){
			sample = valuesTmp[index2];
			var tempValue = sample["temperatura"];
			var humValue = sample["humedad"];
			tempArray.push(tempValue);
			humArray.push(humValue);
		}
		timesArray = timeTmp;
	}
	var dataset ={
        "seriesname" : sensor,
        "description" : "medición de temperatura y humedad relativa del aire",
        "unitOfMeasurement": ["°C","%"],
        "sensor": sensor,
        "observedProperty": observedDHT,
        "observationType": "periódica",
        "temp" : tempArray,
        "hum" : humArray,
        "categories" : timesArray
      };
      
  mongo.MongoClient.connect(dbHost, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("datastream"+sensor);
  collection.update(  
  { _id: "datasetream"+sensor},
  { _id: "datasetream"+sensor, "seriesname" : dataset.seriesname, "description" :  dataset.description, "unitOfMeasurement": dataset.unitOfMeasurement, "sensor": dataset.sensor, "observedProperty": dataset.observedProperty, "observationType": dataset.observationType , observation: { result:{temp: dataset.temp, hum:dataset.hum}, resultTime:dataset.categories } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
	var response = {"dataset" : dataset};
	responseObj.json(response);
	});
}
/**
 * Description
 * @method getDataBMP180
 * @param {} responseObj
 * @return 
 */
function getDataBMP180(responseObj){
	observedBMP180=observed;
	observedBMP180.name=["presión atmosférica","temperatura"];
	dbObject.collection('BMP180').find({}).toArray(function(err, docs){
	if( err ) throw err;
	var timesArray=[];
	var tempArray=[];	
	var presArray=[];	
	for(index in docs){
		doc = docs[index];
		var timeTmp = doc['resultTime'];
		var valuesTmp = doc['result'];
		for(index2  in valuesTmp){
			sample = valuesTmp[index2]['medidas'];
			var tempValue = sample[1];
			var presValue = sample[0];
			tempArray.push(tempValue);
			presArray.push(presValue);
		}
		timesArray = timeTmp;
	}
	var dataset ={
        "seriesname" : 'BMP180',
        "description" : "medición de presión atmosférica y temperatura del aire",
        "unitOfMeasurement": ["hPa","°C"],
        "sensor": "BMP180",
        "observedProperty": observedBMP180,
        "observationType": "periódica",
        "temp" : tempArray,
        "pres" : presArray,
        "categories" : timesArray
      };
     mongo.MongoClient.connect(dbHost, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("datastreamBMP180");
  collection.update(  
  { _id: "datasetreamBMP180"},
  { _id: "datasetreamBMP180", "seriesname" : dataset.seriesname, "description" :  dataset.description, "unitOfMeasurement": dataset.unitOfMeasurement, "sensor": dataset.sensor, "observedProperty": dataset.observedProperty, "observationType": dataset.observationType , observation: { result:{pres:dataset.pres, temp:dataset.temp}, resultTime:dataset.categories } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
	var response = {"dataset" : dataset};
	responseObj.json(response);
	});
}

/**
 * Description
 * @method getDataGP2Y1010AU0F
 * @param {} responseObj
 * @return 
 */
function getDataGP2Y1010AU0F(responseObj){
	observedGP2Y1010Au0F=observed;
	observedGP2Y1010Au0F.name=["densidad de polvo"];
	dbObject.collection("GP2Y1010AU0F").find({}).toArray(function(err, docs){
	if( err ) throw err;
	var timesArray=[];
	var valuesArray=[];	
	for(index in docs){
		doc = docs[index];
		var timeTmp = doc['resultTime'];
		var valuesTmp = doc['result'];
		for(index2  in valuesTmp){
			sample = valuesTmp[index2];
			var DDvalue = sample["densidad de polvo"];
			valuesArray.push(DDvalue);
		}
		timesArray = timeTmp;
	}
	var dataset ={
        "seriesname" : "Densidad de polvo",
        "description" : "medición de densidad de polvo en el aire",
        "unitOfMeasurement": "mg/m3",
        "sensor": "GP2Y1010Au0F",
        "observedProperty": observedBMP180,
        "observationType": "periódica",
        "data" : valuesArray,
        "categories" : timesArray
      };
    	mongo.MongoClient.connect(dbHost, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("datastreamGP2Y1010AU0F");
  collection.update(  
  { _id: "datasetreamGP2Y1010AU0F"},
  { _id: "datasetreamGP2Y1010AU0F", "seriesname" : dataset.seriesname, "description" :  dataset.description, "unitOfMeasurement": dataset.unitOfMeasurement, "sensor": dataset.sensor, "observedProperty": dataset.observedProperty, "observationType": dataset.observationType , observation: { result:dataset.data, resultTime:dataset.categories } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
	var response = {"dataset" : dataset};
	responseObj.json(response);
	});
}


/**
 * Description
 * @method getDataMQ135
 * @param {} responseObj
 * @return 
 */
function getDataMQ135(responseObj){
	observedMQ135=observed;
	observedMQ135.name=["concentración de CO2","concentración de NOx", "concentración de NH3",];
	dbObject.collection("MQ135").find({}).toArray(function(err, docs){
	if( err ) throw err;
	var timesArray=[];
	var CO2Array=[];	
	var NOxArray=[];
	var NH3Array=[];		
	for(index in docs){
		doc = docs[index];
		var timeTmp = doc['resultTime'];
		var valuesTmp = doc['result'];
		for(index2  in valuesTmp){
			sample = valuesTmp[index2];
			var CO2Value = sample["CO2"];
			var NOxValue = sample["NOx"];
			var NH3Value = sample["NH3"];
			CO2Array.push(CO2Value);
			NOxArray.push(NOxValue);
			NH3Array.push(NH3Value);
		}
		timesArray = timeTmp;
	}
	var dataset ={
        "seriesname" : "MQ135",
        "description" : "medición de concentración de dióxido de carbono, óxidos de nitrógeno y amoniaco en el aire",
        "unitOfMeasurement": "ppm",
        "sensor": "MQ135",
        "observedProperty": observedMQ135,
        "observationType": "periódica",
        "CO2" : CO2Array,
        "NOx" : NOxArray,
        "NH3" : NH3Array,
        "categories" : timesArray
      };
    	mongo.MongoClient.connect(dbHost, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("datastreamMQ135");
  collection.update(  
  { _id: "datasetreamMQ135"},
  { _id: "datasetreamMQ135", "seriesname" : dataset.seriesname, "description" :  dataset.description, "unitOfMeasurement": dataset.unitOfMeasurement, "sensor": dataset.sensor, "observedProperty": dataset.observedProperty, "observationType": dataset.observationType , observation: { result:{CO2:dataset.CO2, NOx:dataset.NOx, NH3:dataset.NH3}, resultTime:dataset.categories } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
	var response = {"dataset" : dataset};
	responseObj.json(response);
	});
}



/**
 * Description
 * @method getDataGPS
 * @param {} responseObj
 * @return 
 */
function getDataGPS(responseObj){
	observedGPS=observed;
	observedGPS.name=["concentración de CO2","concentración de NOx", "concentración de NH3",];
	dbObject.collection("devices").find({"title":"Arduino UNO"}).toArray(function(err, docs){
	if( err ) throw err;
	for(index in docs){
		doc = docs[index];
		var latTmp = doc['location']['location']['lat'];
		var lngTmp = doc['location']['location']['lng'];
	}
	var dataset ={
        "seriesname" : "Posición geográfica",
        "description" : "ubicación espacial del sistema de medición",
        "unitOfMeasurement": "grados decimales",
        "sensor": "GPS Neo-6M",
        "observedProperty": observedGPS,
        "observationType": "al inicio",
        "lat" : latTmp, 
        "lng":lngTmp
      };
   	mongo.MongoClient.connect(dbHost, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
  var collection = db.collection("datastreamGPS");
  collection.update(  
  { _id: "datasetreamGPS"},
  { _id: "datasetreamGPS", "seriesname" : dataset.seriesname, "description" :  dataset.description, "unitOfMeasurement": dataset.unitOfMeasurement, "sensor": dataset.sensor, "observedProperty": dataset.observedProperty, "observationType": dataset.observationType , observation: { result:{lat:dataset.lat, lng:dataset.lng}, resultTime:dataset.categories } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
	var response = {"dataset" : dataset};
	responseObj.json(response);
	});
}

//create express app
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  socket.on('my first event', function (data) {
	sensor=data;
	console.log(sensor);
  });
  setInterval(function(){
      var data = 2;
      io.sockets.emit('recarga', data);
  },30000);
});

var Chart = require("chart.js");

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOver("_method"));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Defining middleware to serve static files
app.use('/public', express.static('public'));
app.get("/getMQ7", function(req, res){
  getDataMQ7(res);
});
app.get("/getDHT11", function(req, res){
  getDataDHT(res,'DHT11');
});
app.get("/getDHT22", function(req, res){
  getDataDHT(res,'DHT22');
});
app.get("/getBMP180", function(req, res){
  getDataBMP180(res);
});
app.get("/getGP2Y1010AU0F", function(req, res){
  getDataGP2Y1010AU0F(res);
});
app.get("/getMQ135", function(req, res){
  getDataMQ135(res);
});
app.get("/getGPS", function(req, res){
  getDataGPS(res);
});



app.get("/after", function(req, res){
  res.render("chart",{layout: "main"});
});


app.get("/before", function(req, res){
  res.render("chart",{layout: "main2"});
});

app.get("/", function(req, res){
  res.render("view",{layout: false});
});


server.listen("3300");
  console.log('Servidor en línea: http://192.168.0.77:3300');

