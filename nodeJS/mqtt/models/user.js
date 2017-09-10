var mongoose=require("mongoose");
mongoose.Promise = global.Promise;
var Schema=mongoose.Schema;
mongoose.connect("mongodb://localhost/sensores",{useMongoClient: true });

var email_match=[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un Email válido" ];
var password_validation={validator: function(p){
							return this.password_confirmation==p;
							},
							message: "Las contraseñas no son iguales"
						};


var user_schema=new Schema({
	username: {type: String, required:"El usuario es obligatorio", maxlenght:[50,"Username muy grande"]},
	password: {type: String, required:"El usuario es obligatorio", minlenght:[6,"La constraseña es muy corta"],validate: password_validation },
	email: {type: String, required:"El correo es obligatorio", match:email_match}
	});
	
user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;	
}).set(function(password){
		this.p_c=password;
	});


var User=mongoose.model("User",user_schema);

module.exports.User=User;
