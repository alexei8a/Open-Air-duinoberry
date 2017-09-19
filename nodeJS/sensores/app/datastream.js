var mongodb = require("mongodb");


var mongoUri = "mongodb://localhost:27017/sensores";

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("datastream");
  collection.update(  
  { _id: "datastreams"}, //
  { _id: "datastreams", name : "seriesname", description: "corresponde a los datasets que se usan en Chart.js", unitOfMeasure: "se especifica en cada sensor y además al lado del nombre del datastream", observationType: "periódica (cada 30 segundos)"},
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}
});
