const Gpio = require('onoff').Gpio;
const LED = new Gpio(12, 'out');
const LED2 = new Gpio(21, 'out');
const LED3 = new Gpio(20, 'out');
const LED4 = new Gpio(16, 'out');
const sensor = 6;

//const blinkInterval = setInterval(blinkLED, 250);
const socket = require('socket.io-client')("http://138.68.230.49/");

socket.on("connect", () => {
	console.log("connect");
//	socket.on('rb_turnled', data => console.log("DataFromRN", data))
});

socket.on("rb_turnled", (data) => {
	console.log("Data", data);
	switch(data.led) {
		case 1:
			LED.writeSync(data.turn ? 1 : 0);
		break;
		case 2:
			LED2.writeSync(data.turn ? 1 : 0);
		break;
		case 3:
			LED3.writeSync(data.turn ? 1 : 0);
		break;
		case 4:
			LED4.writeSync(data.turn ? 1 : 0);
		break;

	}
});

setInterval(()=>{
	const sensor = require('node-dht-sensor');
	sensor.read(11, 6, (err, temp, hum) => {
		if(!err){
			console.log("temp:", temp.toFixed(1) + "hum:", hum.toFixed(1));
			socket.emit("sensor_change", {temp: temp, hum: hum});
		}
	});
}, 1000);
