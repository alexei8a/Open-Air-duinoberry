var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/sensores",{useMongoClient: true });

var sen_schema= new Schema({
	title: {type:String, required:true},
	type: {type:String, required:true},
	signal: {type:String, required:true},
	metadata: {type:Schema.Types.Mixed},
	creator: {type:Schema.Types.ObjectId, ref:"Device"},
	});
	
var Sensor = mongoose.model("Sensor",sen_schema);

module.exports = Sensor;
