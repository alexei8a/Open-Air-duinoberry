var socket = io();

socket.on("new device", function(data){
	data = JSON.parse(data);
	console.log(data);
});

socket.on("new sensor", function(data){
	data = JSON.parse(data);
	console.log(data);
});
