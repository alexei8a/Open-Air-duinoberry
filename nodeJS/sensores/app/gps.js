var five = require("johnny-five");
var mongodb  = require("mongodb");
var board = new five.Board();


var pos=[4.631214,-74.075469];

var mongoUri = "mongodb://localhost:27017/sensores";

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("locations");
  collection.update(  
  { _id: "historical locations", name : "Ubicaciones", desciption:"Posiciones históricas del sistema", encodingType : "WGS84"},
    {$push:  { location:{lat:pos[0], lng:pos[1]}, time: new Date() }} ,
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});


mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{
	var collection = db.collection("lastlocation");
  collection.update(  
  { _id: "location"}, //
  { _id: "location", name : "Ubicación", desciption:"Posición inicial del sistema", encodingType : "WGS84", location:{lat:pos[0], lng:pos[1]} },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
 
 


board.on("ready", function() {

  var gps = new five.GPS({
    pins: {rx: 11, tx: 10}
  });

  // If latitude, longitude change log it
  gps.on("change", function() {
    console.log("position");
    var lat=this.latitude;
    console.log("  latitude   : ", lat);
    var lng=this.longitude;
    console.log("  longitude  : ", lng);
    console.log("--------------------------------------");
    pos=[lat,lng];
  });
 
 console.log(pos);
 
 
});



module.exports.pos=pos;
