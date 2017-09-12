var Sensor = require("../models/sensors");
var owner = require("./sensor_permission");

/**
 * Description
 * @method exports
 * @param {} req
 * @param {} res
 * @param {} next
 * @return 
 */
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
