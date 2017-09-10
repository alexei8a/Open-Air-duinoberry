var five = require("johnny-five");
var board = new five.Board();

var pos=[4.631214,-74.075469];

board.on("ready", function() {

  var gps = new five.GPS({
    pins: {rx: 11, tx: 10}
  });

  // If latitude, longitude change log it
  gps.on("change", function() {
    console.log("position");
    var lat=this.latitude;
    console.log("  latitude   : ", lat);
    var lng=this.longitude;
    console.log("  longitude  : ", lng);
    console.log("--------------------------------------");
    pos=[lat,lng];
  });
 
 console.log(pos);
 
 
});


module.exports.pos=pos;
