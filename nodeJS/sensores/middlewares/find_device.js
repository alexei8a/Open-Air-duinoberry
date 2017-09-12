var Device = require("../models/devices");
var owner = require("./device_permission");

/**
 * Description
 * @method exports
 * @param {} req
 * @param {} res
 * @param {} next
 * @return 
 */
module.exports=function(req,res,next){
	Device.findById(req.params.id)
	.populate("creator")
	.exec(function(err,device){
		if(device!=null && owner(device,req,res)){
			res.locals.device=device;
			next();
		}else{
			res.redirect("/app");
		}
	})
}

