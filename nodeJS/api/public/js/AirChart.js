var lat;
var lng;

/**
 * Description
 * @method initMap
 * @return 
 */
function initMap() {
	var un = {lat: lat, lng: lng};
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 12,
		center: un
	});
	var marker = new google.maps.Marker({
	  position: un,
	  map: map
	});
} 

var now = moment();
console.log(now);

$(function(){
  $.ajax({
	
    url: 'http://192.168.0.77:3300/getGPS',
    type: 'GET',
    
    /**
     * Description
     * @method success
     * @param {} dataIn2
     * @return 
     */
    success : function(dataIn2) {
			 lat = dataIn2['dataset']["lat"];
			 lng = dataIn2['dataset']["lng"];
			console.log(lat);
			console.log(lng);
			$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAnf7WL7wn3uahR-g68sVJ4CjubysB9KQU&callback=initMap");




	}
	
})});


var myLineChartMQ7;
var myLineChartDHT11;
var myLineChartDHT22;
var myLineChartBMP180P;
var myLineChartBMP180T;
var myLineChartGP2Y1010AU0F;
var myLineChartMQ135;

/**
 * Description
 * @method getDatos
 * @return 
 */
function getDatos(){
	
	$(function(){
  $.ajax({

    url: 'http://192.168.0.77:3300/getMQ7',
    type: 'GET',
    /**
     * Description
     * @method success
     * @param {} dataIn
     * @return 
     */
    success : function(dataIn) {
		console.log(dataIn);
			var canvas = document.getElementById('myChartMQ7');			
			//Sólo muestra los datos de las mediciones actuales, aunque guarda en la base de datos
			var timesArray=[];
			var valuesArray=[];
			for(index in dataIn['dataset']["categories"]){
			arr=dataIn['dataset']["categories"][index];
			arr2=dataIn['dataset']["data"][index];
			if(moment(arr).isAfter(now))
			{
			valuesArray.push(arr2);
			timesArray.push(arr);
			}
			}
			var data = {
			labels:timesArray,
			datasets: [
				{
					label: "MQ7 "+dataIn['dataset']["seriesname"]+" (ppm)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(250,20,20,1)",
					borderColor: "rgba(250,20,20,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(250,20,20,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(250,20,20,1)",
					pointHoverBorderColor: "rgba(250,20,20,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: valuesArray,
				}
			]
		};

		var option = {
			animation: false,
			showLines: true,
			scales: {
					xAxes: [{
						type: 'time',
						scaleLabel: {
                            display: true,
                            labelString: 'Fecha-hora'
                        }
					}],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Concentración'
                        }
                    }]
                },
              cubicInterpolationMode: "monotone"
		};
		
		 if (typeof myLineChartMQ7 !== 'undefined') {
		myLineChartMQ7.destroy();
		}
		
		myLineChartMQ7 = Chart.Line(canvas,{
			data:data,
			options:option
		});

	}
})}); 



$(function(){
  $.ajax({

    url: 'http://192.168.0.77:3300/getDHT11',
    type: 'GET',
    /**
     * Description
     * @method success
     * @param {} dataIn
     * @return 
     */
    success : function(dataIn) {
		console.log(dataIn);
			var canvas = document.getElementById('myChartDHT11');
			//Sólo muestra los datos de las mediciones actuales, aunque guarda en la base de datos
			var timesArray=[];
			var tempArray=[];
			var humArray=[];
			for(index in dataIn['dataset']["categories"]){
			arr=dataIn['dataset']["categories"][index];
			arr2=dataIn['dataset']["temp"][index];
			arr3=dataIn['dataset']["hum"][index];
			if(moment(arr).isAfter(now))
			{
			tempArray.push(arr2);
			humArray.push(arr3);
			timesArray.push(arr);
			}
			}
			var data = {
			labels:timesArray,
			datasets: [
				{
					label: dataIn['dataset']["seriesname"]+' temp'+" (°C)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(239, 127, 26,1)",
					borderColor: "rgba(239, 127, 26,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(239, 127, 26,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(239, 127, 26,1)",
					pointHoverBorderColor: "rgba(239, 127, 26,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: tempArray,
				},
					{
					label: dataIn['dataset']["seriesname"]+' hum'+" (%)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(20,20,250,1)",
					borderColor: "rgba(20,20,250,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(20,20,250,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(20,20,250,1)",
					pointHoverBorderColor: "rgba(20,20,250,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: humArray,
				}
			]
		};

		var option = {
			animation: false,
			showLines: true,
			scales: {
					xAxes: [{
						type: 'time',
						scaleLabel: {
                            display: true,
                            labelString: 'Fecha-hora'
                        }
					}],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperatura / Humedad relativa'
                        }
                    }]
                },
              cubicInterpolationMode: "monotone"
		};
		
		
		if (typeof myLineChartDHT11 !== 'undefined') {
		myLineChartDHT11.destroy();
		}
		
			myLineChartDHT11 = Chart.Line(canvas,{
			data:data,
			options:option
			
		});

	}
})});
$(function(){
  $.ajax({

    url: 'http://192.168.0.77:3300/getDHT22',
    type: 'GET',
    /**
     * Description
     * @method success
     * @param {} dataIn
     * @return 
     */
    success : function(dataIn) {
		console.log(dataIn);
			var canvas = document.getElementById('myChartDHT22');
			//Sólo muestra los datos de las mediciones actuales, aunque guarda en la base de datos
			var timesArray=[];
			var tempArray=[];
			var humArray=[];
			for(index in dataIn['dataset']["categories"]){
			arr=dataIn['dataset']["categories"][index];
			arr2=dataIn['dataset']["temp"][index];
			arr3=dataIn['dataset']["hum"][index];
			if(moment(arr).isAfter(now))
			{
			tempArray.push(arr2);
			humArray.push(arr3);
			timesArray.push(arr);
			}
			}
			var data = {
			labels:timesArray,
			datasets: [
				{
					label: dataIn['dataset']["seriesname"]+' hum'+" (%)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(100,100,100,1)",
					borderColor: "rgba(100,100,100,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(100,100,100,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(100,100,100,1)",
					pointHoverBorderColor: "rgba(100,100,100,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: humArray,
				},
				{
					label: dataIn['dataset']["seriesname"]+' temp'+" (°C)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(20,200,150,1)",
					borderColor: "rgba(20,200,150,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(20,200,150,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(20,200,150,1)",
					pointHoverBorderColor: "rgba(20,200,150,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: tempArray,
				}
			]
		};

		var option = {
			animation: false,
			showLines: true,
			scales: {
					xAxes: [{
						type: 'time',
						scaleLabel: {
                            display: true,
                            labelString: 'Fecha-hora'
                        }
					}],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperatura / Humedad relativa'
                        }
                    }]
                },
              cubicInterpolationMode: "monotone"
		};
		
		if (typeof myLineChartDHT22 !== 'undefined') {
		myLineChartDHT22.destroy();
		}
		
			myLineChartDHT22 = Chart.Line(canvas,{
			data:data,
			options:option
		});

	}
})});
$(function(){
  $.ajax({

    url: 'http://192.168.0.77:3300/getBMP180',
    type: 'GET',
    /**
     * Description
     * @method success
     * @param {} dataIn
     * @return 
     */
    success : function(dataIn) {
		console.log(dataIn);
			var canvasP = document.getElementById('myChartBMP180P');
			var canvasT= document.getElementById('myChartBMP180T');
			//Sólo muestra los datos de las mediciones actuales, aunque guarda en la base de datos
			var timesArray=[];
			var tempArray=[];
			var presArray=[];
			for(index in dataIn['dataset']["categories"]){
			arr=dataIn['dataset']["categories"][index];
			arr2=dataIn['dataset']["temp"][index];
			arr3=dataIn['dataset']["pres"][index];
			if(moment(arr).isAfter(now))
			{
			tempArray.push(arr2);
			presArray.push(arr3);
			timesArray.push(arr);
			}
			}	
			
			
			var dataP = {
			labels:timesArray,
			datasets: [
				{
					label: dataIn['dataset']["seriesname"]+' pres'+" (hPa)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(111, 78, 55,1)",
					borderColor: "rgba(111, 78, 55,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(111, 78, 55,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(111, 78, 55,1)",
					pointHoverBorderColor: "rgba(111, 78, 55,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: presArray,
				}
			]
		};
		var dataT = {
			labels:timesArray,
			datasets: [
				{
					label: dataIn['dataset']["seriesname"]+' temp'+" (°C)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(247,170,170,1)",
					borderColor: "rgba(247,170,170,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(247,170,170,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(247,170,170,1)",
					pointHoverBorderColor: "rgba(247,170,170,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: tempArray,
				}
			]
		};
		var option = {
			animation: false,
			showLines: true,
			scales: {
					xAxes: [{
						type: 'time',
						scaleLabel: {
                            display: true,
                            labelString: 'Fecha-hora'
                        }
					}],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Presión Atmosférica'
                        }
                    }]
                },
              cubicInterpolationMode: "monotone"
		};

		var option2 = {
			animation: false,
			showLines: true,
			scales: {
					xAxes: [{
						type: 'time',
						scaleLabel: {
                            display: true,
                            labelString: 'Fecha-hora'
                        }
					}],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperatura'
                        }
                    }]
                },
              cubicInterpolationMode: "monotone"
		};
		
		
		if (typeof myLineChartBMP180P !== 'undefined') {
		myLineChartBMP180P.destroy();
		}
		
		if (typeof myLineChartBMP180T !== 'undefined') {
		myLineChartBMP180T.destroy();
		}
		
			myLineChartBMP180P = Chart.Line(canvasP,{
			data:dataP,
			options:option
		});
			myLineChartBMP180T = Chart.Line(canvasT,{
			data:dataT,
			options:option2
		});

	}
})});

$(function(){
  $.ajax({

    url: 'http://192.168.0.77:3300/getGP2Y1010AU0F',
    type: 'GET',
    /**
     * Description
     * @method success
     * @param {} dataIn
     * @return 
     */
    success : function(dataIn) {
		console.log(dataIn);
			var canvas = document.getElementById('myChartGP2Y1010AU0F');
			//Sólo muestra los datos de las mediciones actuales, aunque guarda en la base de datos
			var timesArray=[];
			var valuesArray=[];
			for(index in dataIn['dataset']["categories"]){
			arr=dataIn['dataset']["categories"][index];
			arr2=dataIn['dataset']["data"][index];
			if(moment(arr).isAfter(now))
			{
			valuesArray.push(arr2);
			timesArray.push(arr);
			}
			}
			
			var data = {
			labels:timesArray,
			datasets: [
				{
					label: "GP2Y1010AU0F "+dataIn['dataset']["seriesname"]+" (mg/m3)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(250,210,1,1)",
					borderColor: "rgba(250,210,1,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(250,210,1,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(250,210,1,1)",
					pointHoverBorderColor: "rgba(250,210,1,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: valuesArray,
				}
			]
		};

		var option = {
			animation: false,
			showLines: true,
			scales: {
					xAxes: [{
						type: 'time',
						scaleLabel: {
                            display: true,
                            labelString: 'Fecha-hora'
                        }
					}],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Densidad de polvo'
                        }
                    }]
                },
              cubicInterpolationMode: "monotone"
		};
		
		
		if (typeof myLineChartGP2Y1010AU0F !== 'undefined') {
		myLineChartGP2Y1010AU0F.destroy();
		}
		
		
			myLineChartGP2Y1010AU0F = Chart.Line(canvas,{
			data:data,
			options:option
		});

	}
})});


$(function(){
  $.ajax({

    url: 'http://192.168.0.77:3300/getMQ135',
    type: 'GET',
    /**
     * Description
     * @method success
     * @param {} dataIn
     * @return 
     */
    success : function(dataIn) {
		console.log(dataIn);
			var canvas = document.getElementById('myChartMQ135');
			//Sólo muestra los datos de las mediciones actuales, aunque guarda en la base de datos
			var timesArray=[];
			var CO2Array=[];
			var NOxArray=[];
			var NH3Array=[];
			for(index in dataIn['dataset']["categories"]){
			arr=dataIn['dataset']["categories"][index];
			arr2=dataIn['dataset']["CO2"][index];
			arr3=dataIn['dataset']["NOx"][index];
			arr4=dataIn['dataset']["NH3"][index];
			if(moment(arr).isAfter(now))
			{
			CO2Array.push(arr2);
			NOxArray.push(arr3);
			NH3Array.push(arr4);
			timesArray.push(arr);
			}
			}

			var data = {
			labels:timesArray,
			datasets: [
				{
					label: dataIn['dataset']["seriesname"]+' CO2'+" (ppm)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,1)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(75,192,192,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: CO2Array,
				},
				{
					label: dataIn['dataset']["seriesname"]+' NOx'+" (ppm)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,18,192,9)",
					borderColor: "rgba(75,18,192,9)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,18,192,9)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,18,192,9)",
					pointHoverBorderColor: "rgba(75,18,192,9)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: NOxArray,
				},
				{
					label: dataIn['dataset']["seriesname"]+' NH3'+" (ppm)",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(200,18,192,9)",
					borderColor: "rgba(200,18,192,9)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(200,18,192,9)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(200,18,192,9)",
					pointHoverBorderColor: "rgba(200,18,192,9)",
					pointHoverBorderWidth: 2,
					pointRadius: 5,
					pointHitRadius: 10,
					data: NH3Array,
				}
			]
		};

		var option = {
			animation: false,
			showLines: true,
			scales: {
					xAxes: [{
						type: 'time',
						scaleLabel: {
                            display: true,
                            labelString: 'Fecha-hora'
                        }
					}],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Concentración'
                        }
                    }]
                },
              cubicInterpolationMode: "monotone"
		};
		
		if (typeof myLineChartMQ135 !== 'undefined') {
		myLineChartMQ135.destroy();
		}
		
			myLineChartMQ135 = Chart.Line(canvas,{
			data:data,
			options:option
		});

	}
})});
	
}

getDatos();

var socket = io.connect('http://192.168.0.77:3300');
  socket.emit('my first event', 'inicio');
  socket.on('recarga', function (data) { 
 getDatos();

});
