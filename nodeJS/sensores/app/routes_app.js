var express = require("express");
var Device = require("../models/devices");
var router = express.Router();
var redis = require("redis");
var flash = require("express-flash");
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';
var gps = require("./gps");
var mongodb  = require("mongodb");


var lat=gps.pos[0];
console.log(lat);
var lng=gps.pos[1];
console.log(lng);



var client = redis.createClient();


var dev_find_midd = require("../middlewares/find_device");
var mongoUri = "mongodb://localhost:27017/sensores";
var location;
var historicalLocation;

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("lastlocation");
  
  	 collection.findOne({_id:"location"}, function(err,doc){
	if(!err)
	{
	location=doc;
}
}); 
}
});

mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) {
        throw err; 
        console.log("Error");
        }
	else{	
	var collection = db.collection("locations");
  
  	 collection.findOne({_id:"historical locations"}, function(err,doc){
	if(!err)
	{
	historicalLocation=doc;
}
}); 
}
});





/**
 * Description
 * @method encrypt
 * @param {} text
 * @return crypted
 */
function encrypt(text){
	var cipher = crypto.createCipher(algorithm,password)
			var crypted = cipher.update(text,'utf8','hex')
			crypted += cipher.final('hex');
	return crypted;
}

/**
 * Description
 * @method decrypt
 * @param {} text
 * @return dec
 */
function decrypt(text){
	var decipher = crypto.createDecipher(algorithm,password)
			var dec = decipher.update(text,'hex','utf8')
			dec += decipher.final('utf8');
	return dec;
}

router.get("/",function(req,res){
	console.log(location);
console.log(historicalLocation);
	res.render("app/home");
});


router.get("/reset",function(req,res){
	res.render("app/reset");
});

router.get("/measures",function(req,res){
	res.render("app/measures");
});

router.post("/reset",function(req,res){
	if((req.body.password==req.body.password_confirmation)&&(req.body.password.length>=6)){
		res.locals.user.password=encrypt(req.body.password);
		res.locals.user.password_confirmation=encrypt(req.body.password_confirmation);
		res.locals.user.save(function(err){
			if(!err){

				res.render("app/home",{message:req.flash("success","La contraseña se cambió con éxito")}); 
			}
			else{
				req.flash("error","No fue posible cambiar la contraseña. Intenta de nuevo");
				res.redirect("/app/reset");
			}	
		});	
	}
	else if(req.body.password!=req.body.password_confirmation){
		res.render("app/reset", {message:req.flash("error","Las contraseñas no coinciden")});
	}
	else{
		res.render("app/reset", {message:req.flash("error","La contraseña nueva es muy corta. Debe ser mínimo de 6 caracteres.")});
	}

});



router.get("/devices/new",function(req,res){
	res.render("app/devices/new")
});



router.all("/devices/:id*",dev_find_midd);


router.get("/devices/:id/edit",function(req,res){
	res.render("app/devices/edit");
});

router.get("/devices/:id/show",function(req,res){
	res.render("app/devices/show")
});

router.route("/devices/:id")
.get(function(req,res){
	//res.render("app/devices/show");
	res.redirect("/app/devices");
})
.put(function(req,res){
	res.locals.device.title=req.body.title;
	res.locals.device.comm_protocol=req.body.comm_protocol;
	res.locals.device.description=req.body.description;
	var prop = require("./properties");
	var proper= prop.selectProperties(res.locals.device.title);
	res.locals.device.location=location;
	//res.locals.device.historicalLocations=historicalLocation;
	res.locals.device.properties=proper; //
	res.locals.device.lat=lat; //
	res.locals.device.lng=lng; //
	res.locals.device.save(function(err){
		if(!err){
			res.render("app/devices/show",{message: req.flash("info","Dispositivo editado con éxito")});
		}
		else{
			req.flash("error","No es posible editar el dispositivo. Intenta de nuevo");
			res.redirect("/app/devices/"+req.params.id+"/edit");
		}	
	});		
})
.delete(function(req,res){
	Device.findOneAndRemove({_id: req.params.id},function(err){
		if(!err){
			req.flash("error","Dispositivo eliminado con éxito");
			res.redirect("/app/devices");
		}
		else{
			res.redirect("/app/devices"+req.params.id);
		}
	});
});

router.route("/devices")
.get(function(req,res)
		{
	Device.find({creator: res.locals.user._id}, function(err,devices){
		if(err){
			res.redirect("/app"); return;
		}
		res.render("app/devices/index",{devices:devices});
	})
		})
.post(function(req,res){
	var data={
			title: req.body.title,
			creator: res.locals.user._id,
			comm_protocol: req.body.comm_protocol,
			description:req.body.description,			
	}
	var device = new Device(data);
	var prop = require("./properties");
	var proper= prop.selectProperties(device.title);
	device.location=location;
	//device.historicalLocations=historicalLocation;
	device.properties=proper; //
	device.lat=lat; //
	device.lng=lng; //
	device.save(function(err){
		if(!err){					
			var devJSON={
					"id": device._id,
					"title": device.title,
					"comm_protocol": device.comm_protocol,
					"properties": device.properties,
					"location": device.location,
					"lat": device.lat,
					"lng": device.lng,
					"creator": device.creator,
					"location": device.location,
					//"historicalLocation": device.historicalLocation
			};

			client.publish("devices",JSON.stringify(devJSON));
			req.flash("success","Dispositivo añadido con éxito");
			res.redirect("/app/devices");
		}
		else{
			req.flash("error","No se ha podido crear el dispositivo, intenta de nuevo");
			res.redirect("/app/devices/new");
		}	
	});

});


module.exports=router;
