var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var dev_schema= new Schema({
	title: {type:String, required:true},
	comm_protocol: {type:String, required:true},
	creator: {type:Schema.Types.ObjectId, ref:"User"},
	lat: {type:Number, required:true},
	lng: {type:Number, required:true},
});

var Device = mongoose.model("Device",dev_schema);

module.exports = Device;
