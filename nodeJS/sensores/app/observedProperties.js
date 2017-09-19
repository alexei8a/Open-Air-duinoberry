var mongodb = require("mongodb");


var mongoUri = "mongodb://localhost:27017/sensores";

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("observedProperties");
  collection.update(  
  { _id: "observedProperties"}, //
  { _id: "observedProperties", name : ["temperatura", "humedad", "presión atmosférica", "densidad de polvo", "concentración de CO", "concentración de CO2", "concentración de NOx", "concentración de NH3"], definition : ["WGS84"] },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
