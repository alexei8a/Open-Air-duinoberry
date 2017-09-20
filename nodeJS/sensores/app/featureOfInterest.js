var mongodb = require("mongodb");


var mongoUri = "mongodb://localhost:27017/sensores";

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("feature");
  collection.update(  
  { _id: "Feature of Interest"}, //
  { _id: "Feature of Interest" , name : "Calidad del aire", description: "mide el estado de contaminación presente en el aire", encodingType:"datos provenientes de diversos sensores", feature:"se miden las variables referenciadas en observedProperties"},
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
