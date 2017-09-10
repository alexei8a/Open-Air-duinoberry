var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var dev_schema= new Schema({
	title: {type:String, required:true},
	//number_sensors: {type:Number, required:true},
	comm_protocol: {type:String, required:true},
	creator: {type:Schema.Types.ObjectId, ref:"User"},
	});
	
var Device = mongoose.model("Device",dev_schema);

module.exports = Device;
