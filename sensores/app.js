var express = require("express");
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require("body-parser");
var logger = require('morgan');
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./app/routes_app");
var router_sen = require("./app/routes_sensor");
var session_midd = require("./middlewares/session");
var cookieParser = require("cookie-parser");
var methodOver = require("method-override");
var RedisStore = require("connect-redis")(session);
var flash = require("express-flash");
var mailer = require("express-mailer");
var http = require("http");
var app=express();
var server = http.Server(app);
var realtime = require("./realtime");
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';




mailer.extend(app, {
	from: "Alekos",
	host: "smtp.gmail.com", // hostname 
	secureConnection: true, // use SSL 
	port: 465, // port for secure SMTP 
	transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts 
	auth: {
	user: "alexei8a@gmail.com", // email id
	pass: "285295"  // password
}
});


function encrypt(text){
	var cipher = crypto.createCipher(algorithm,password)
			var crypted = cipher.update(text,'utf8','hex')
			crypted += cipher.final('hex');
	return crypted;
}

function decrypt(text){
	var decipher = crypto.createDecipher(algorithm,password)
			var dec = decipher.update(text,'hex','utf8')
			dec += decipher.final('utf8');
	return dec;
}

app.set("view engine","jade");
app.use("/public",express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOver("_method"));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(cookieParser());


var sessionMidd = session({
	store: new RedisStore({}),
	secret: "super ultra secret",
	resave: false,
	saveUninitialized: true
});

realtime(server,sessionMidd);
app.use(sessionMidd);
app.use(flash());	


app.use(function(req,res,next){
	res.locals.sessionFlash=req.sessionFlash;
	delete req.session.sessionFlash;
	next();
});


app.get("/", function(req,res){
	res.render("index");
});

app.get("/signup", function(req,res){
	User.find(function(err,doc){
		res.render("signup");
	});
});

app.get("/login", function(req,res){
	res.render("login");
});

app.post("/users", function(req,res){	
	var user = new User({
		name:req.body.name,
		email:req.body.email, 
		password:req.body.password, 
		password_confirmation:req.body.password_confirmation,
		username:req.body.username});


	User.findOne({username:user.username},function(err,user2,next){
		if(user2){
			req.flash("error","El usuario ya existe. Intenta nuevamente");
			res.redirect("/signup");}

		else {
			User.findOne({email:user.email},function(err,user3,next){
				if(user3){
					req.flash("error","Ya existe un usuario registrado con ese correo. Intenta nuevamente");
					res.redirect("/signup");}

				else {
					if((user.password==user.password_confirmation)&&(user.password.length>=6)){		
						user.password=encrypt(user.password);
						user.password_confirmation=encrypt(user.password_confirmation);
						console.log(user.password);
						user.save().then(function(us){
						var nombre = user.name;
							res.render("login", {message: req.flash('info',"El usuario ha sido creado exitosamente. Te hemos enviado un correo de bienvenida. Ya puedes ingresar")});

							app.mailer.send("email", //view engine i.e template name
									{
								to: req.body.email,      // REQUIRED. This can be a comma delimited string just like a normal email to field.  
								subject: "Bienvenido a Open Air-duinoberry", // REQUIRED.       
								nombre: nombre
									}, function (err) {
										if (err) {
											console.log(err);
											res.send("Hubo un error enviando el email "+err); 
											return;}});

						});
					}

					else {
						if (user.password!=user.password_confirmation){
							res.render("signup",{message: req.flash('error',"Las contraseñas no coinciden")});}
						else{
							res.render("signup",{message: req.flash('error',"La contraseña es muy corta. Debe ser mínimo de 6 carcteres.")});}

					}  } });



		}
	});

}
		);




app.get("/logout", function(req,res){
	if(req.session.key){
		req.session.destroy(function(){
			res.redirect("/");
		});
	}	else {
		res.redirect("/");
	}
});


app.post("/sessions", function(req,res){
	User.findOne({username:req.body.username},function(err,user){
		if(!user)
		{
			req.flash("error","El usuario no existe. Intenta nuevamente");
			res.redirect("/login");
		}

		else{
			User.findOne({username:req.body.username, password:encrypt(req.body.password)},function(err,user){
				if(!user)
				{
					req.flash("error","La contraseña no es correcta. Intenta nuevamente");
					res.redirect("/login");
				}

				else {req.session.user_id=user._id;
				req.flash("success","Bienvenido");
				res.redirect("/app");
				}

			});



		}

	});
});



app.get('/forgot', function(req, res) {
	res.render('forgot', {
		user: req.user
	});
});


app.post('/forgot', function(req, res, next) {
	User.findOne({ email: req.body.email }, function(err, user) {
		if (!user) {
			req.flash('error', 'No existe una cuenta con ese correo.');
			return res.redirect('/forgot');
		}

		else {
			var usuario=user.username;
			var nombre=user.name;
			var pass=decrypt(user.password);
			res.render('forgot', {message: req.flash('info',"Te hemos enviado un correo con tus datos. ¡¡Ya puedes ingresar!!")});


			
			app.mailer.send("email2", //view engine i.e template name
									{
				to: user.email,      // REQUIRED. This can be a comma delimited string just like a normal email to field.  
				subject: "Recordar contraseña", // REQUIRED.   
				nombre: nombre,
				usuario:usuario,
				pass: pass    
				
				}, function (err) {
				if (err) {
				console.log(err);
				res.send("Hubo un error enviando el email "+err); 
				return;}});
			
		}
	});
}); 




app.use("/app",session_midd);

app.use("/app",router_app);

app.use("/app/devices",router_sen);

server.listen("9090");
console.log('Servidor en línea: http://192.168.0.77:9090');

