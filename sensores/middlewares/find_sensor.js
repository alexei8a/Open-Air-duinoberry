var Sensor = require("../models/sensors");
var owner = require("./sensor_permission");

module.exports=function(req,res,next){
	Sensor.findById(req.params.id)
	.populate("creator")
	.exec(function(err,sensor){
		if(sensor!=null && owner(sensor,req,res)){
			res.locals.sensor=sensor;
			next();
		}else{
			res.redirect("/app/devices/:id/sensors");
		}
	})
}
