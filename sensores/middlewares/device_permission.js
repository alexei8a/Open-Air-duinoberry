var Device = require("../models/devices");

module.exports = function(device,req,res){
	if(typeof device.creator=="undefined"){
		return false;
	}

	if(req.method=="GET" && req.path.indexOf("edit")<0){
		return true;
	}

	if(device.creator._id.toString()==res.locals.user._id){
		return true;
	}

	return false;

}
