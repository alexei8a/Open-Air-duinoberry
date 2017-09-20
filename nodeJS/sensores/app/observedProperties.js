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
  { _id: "observedProperties", name : ["temperatura", "humedad", "presión atmosférica", "densidad de polvo", "concentración de CO", "concentración de CO2", "concentración de NOx", "concentración de NH3", "posición geográfica"], description: "estas propiedades se encuentran descritas en la ontología AIR_POLLUTION_Onto", definition : "http://dblp.l3s.de/d2r/page/publications/conf/ifip12/Oprea09" },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
