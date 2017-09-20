var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var dev_schema= new Schema({
	title: {type:String, required:true},
	comm_protocol: {type:String, required:true},
	description: {type:String},
	properties: {type:Schema.Types.Mixed},
	creator: {type:Schema.Types.ObjectId, ref:"User"},
	location:  {type:Schema.Types.Mixed},
	historicalLocations: {type:Schema.Types.Mixed},
	lat: {type:Number, required:true},
	lng: {type:Number, required:true},
});

var Device = mongoose.model("Device",dev_schema);

module.exports = Device;
