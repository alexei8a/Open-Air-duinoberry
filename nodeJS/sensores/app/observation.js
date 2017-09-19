var mongodb = require("mongodb");


var mongoUri = "mongodb://localhost:27017/sensores";

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("observation");
  collection.update(  
  { _id: "observation" }, //
  { _id: "observation", sensor_name : "nombre del sensor que hace la observación", description : "las observaciones se guardan en colecciones espec{ificas para cada sensor" , phenomenonTime: "when", result: "values", resultTime: "when"},
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
