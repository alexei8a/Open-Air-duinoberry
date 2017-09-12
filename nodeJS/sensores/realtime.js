/**
 * Description
 * @method exports
 * @param {} server
 * @param {} sessionMidd
 * @return 
 */
module.exports = function(server, sessionMidd){
	var io = require ("socket.io")(server);
	var redis = require("redis");
	var client = redis.createClient();
	

	client.subscribe("devices");
	client.subscribe("sensors");

	io.use(function(socket,next){
		sessionMidd(socket.request,socket.request.res,next);
	});

	client.on("message",function(channel,message){
		if (channel=="devices"){
			//console.log("nuevo disp");
			io.emit("new device",message);
		}
		if (channel=="sensors"){
			//console.log("nuevo sen");
			io.emit("new sensor",message);
		}
	});


	io.sockets.on("connection",function(socket){
		console.log(socket.request.session.user_id);
	});
}

