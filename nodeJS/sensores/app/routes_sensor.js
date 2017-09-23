var express = require("express");
var Sensor = require("../models/sensors");
var router = express.Router();
var redis = require("redis");
var client = redis.createClient();
var flash = require("express-flash");
var observed = require("./observedProperties");
var observation = require("./observation");
var datastream = require("./datastream");
var feature = require("./featureOfInterest");

var sen_find_midd = require("../middlewares/find_sensor");


router.get("/",function(req,res){
	res.render("app/devices/home");
});


router.get("/:id/sensors",function(req,res){
	res.render("app/devices/home");
});


router.get("/:id/sensors/new",function(req,res){
	res.render("app/devices/sensors/new")
});


router.all("/:id/sensors/:id*",sen_find_midd);


router.get("/:id/sensors/:id/edit",function(req,res){
	res.render("app/devices/sensors/edit");
});

router.get("/:id/sensors/:id/show",function(req,res){
	res.render("app/devices/sensors/show")
});

router.route("/:id/sensorlist")
.get(function(req,res){
	Sensor.find({creator: res.locals.device._id}, function(err,sensors){
		if(err){
			res.redirect("/app/devices"); return;
		}
		res.render("app/devices/sensors/index",{sensors:sensors});
	})
})
.put(function(req,res){
	res.locals.sensor.title=req.body.title;
	res.locals.sensor.type=req.body.type;
	res.locals.sensor.signal=req.body.signal;
	res.locals.sensor.description=req.body.description;
	var met = require("./metadata");
	var meta= met.selectMetadata(res.locals.sensor.title);
	res.locals.sensor.metadata=meta;
	res.locals.sensor.save(function(err){
		if(!err){	
			res.render("app/devices/sensors/show",{message: req.flash("info","Dispositivo editado con éxito")});
		}
		else{
			res.render("app/devices//sensors/edit");
		}	
	});		
})
.delete(function(req,res){
	Sensor.findOneAndRemove({_id: req.params.id},function(err){
		if(!err){
			req.flash("error","Sensor eliminado con éxito");
			res.redirect("/app/devices/"+res.locals.device._id+"/sensorlist");
		}
		else{
			res.redirect("/app/devices/sensors");
		}
	});
});



router.route("/:id/sensors")
.get(function(req,res)
		{
	Sensor.find({creator: res.locals.device._id}, function(err,sensors){
		if(err){
			res.redirect("/app/devices"); return;
		}
		res.render("app/devices/sensors/index",{sensors:sensors});
	})
		})
.post(function(req,res){

	var data={
			title: req.body.title,
			type: req.body.type,
			creator: res.locals.device._id,
			signal: req.body.signal,
			description:req.body.description,
	}


	var sensor = new Sensor(data);

	var met = require("./metadata");
	var meta= met.selectMetadata(sensor.title);

	sensor.metadata=meta;

	sensor.save(function(err){
		if(!err){
			var senJSON={
					"id": sensor._id,
					"title": sensor.title,
					"description": sensor.description,
					"type": sensor.type,
					"creator": sensor.creator,
					"signal": sensor.signal,
					"metadata": sensor.metadata
			};

			client.publish("sensors",JSON.stringify(senJSON));
			req.flash("success","Sensor añadido con éxito");
			res.redirect("/app/devices/"+res.locals.device._id+"/sensorlist");
		}
		else{
			req.flash("error","No ha sido posible añadir el sensor");
			res.redirect("/app/devices/"+res.locals.device._id+"/sensorlist");
		}	
	});



}  )



router.route("/:id/sensors/:id")
.get(function(req,res){
	Sensor.find({creator: res.locals.device._id}, function(err,sensors){
		if(err){
			res.redirect("/app/devices"); return;
		}
		res.render("app/devices/sensors/index",{sensors:sensors});
	})
})
.put(function(req,res){
	res.locals.sensor.title=req.body.title;
	res.locals.sensor.type=req.body.type;
	res.locals.sensor.signal=req.body.signal;
	res.locals.sensor.description=req.body.description;
	var met = require("./metadata");
	var meta= met.selectMetadata(res.locals.sensor.title);
	res.locals.sensor.metadata=meta;

	res.locals.sensor.save(function(err){
		if(!err){
			res.render("app/devices/sensors/show",{message: req.flash("info","Dispositivo editado con éxito")});
		}
		else{
			res.render("app/devices/sensors/edit");
		}	
	});		
})
.delete(function(req,res){
	Sensor.findOneAndRemove({_id: req.params.id},function(err){
		if(!err){
			req.flash("error","Sensor eliminado con éxito");
			res.redirect("/app/devices/"+res.locals.device._id+"/sensorlist");
		}
		else{
			req.flash("error","Hubo un problema y no se pudo eliminar el sensor");
			res.redirect("/app/devices/"+res.locals.device._id+"/sensorlist");
		}
	});
});






module.exports=router;
