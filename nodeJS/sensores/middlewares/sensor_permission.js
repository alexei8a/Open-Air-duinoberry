var Sensor = require("../models/sensors");

module.exports = function(sensor,req,res){
	if(typeof sensor.creator=="undefined"){
		return false;
	}

	if(req.method=="GET" && req.path.indexOf("edit")<0){
		return true;
	}

	if(sensor.creator._id.toString()==res.locals.device._id){
		return true;
	}

	return false;

}
