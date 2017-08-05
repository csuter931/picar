//declare required modules
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , static = require('node-static')
  , sys = require('sys')
  , piblaster = require('pi-blaster.js')
  , sleep = require('sleep')
  , argv = require('optimist').argv;
  app.listen(8080);


//Make a web server on port 8080
//
var file = new(static.Server)();
function handler(request, response) 
{
  console.log('serving file',request.url)
  file.serve(request, response);
};

var logcount = 0;

console.log('Pi Car we server listening on port 8080 visit http://ipaddress:8080/socket.html');

lastAction = null;

// If we lose comms set the servos to neutral
//
function emergencyStop()
{
	//enter 0 point here specific to your pwm control
  	piblaster.setPwm(17, .15); //thr
 	piblaster.setPwm(18, .15); //spd
  	console.log('###EMERGENCY STOP - signal lost or shutting down');
}//END emergencyStop


// fire up a web socket server isten to cmds from the phone and set pwm
// accordingly, if using a separate battery pack then disable the 
// motor acceleration rate limiting algorithm as this is required when the
// Pi and motors share the same battery.
//
io.sockets.on('connection', function (socket) 
{ 
	// got phone msg
	socket.on('fromclient', function (data) 
	{
		logcount = logcount + 1;
			
		// dont let char echos slow dn the app; we are running at 20Hz
		// dont le the console limit this due to slow echoing of chars
		if(logcount == 10)
		{
			//@ 2 Hz
			logcount = 0;
			console.log("Beta: "+data.beta+" Gamma: "+data.gamma+" oBeta: "+data.oBeta+" oGamma: "+data.oGamma+" isReversedSince: "+data.isReversedSince);
		}
		
		// control car using clever pwm gpio library
		piblaster.setPwm(17, data.gamma);
		piblaster.setPwm(18, data.beta);

		clearInterval(lastAction); // stop emergency stop timer
		lastAction = setInterval(emergencyStop, 1000); // set emergency stop timer for 1 second
				
	});
});//END io.sockets.on


//user hits ctrl+c
//
process.on('SIGINT', function() 
{
  emergencyStop();
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
 
  return process.exit();
});//END process.on
