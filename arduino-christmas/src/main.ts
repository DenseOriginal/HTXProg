import * as five from "johnny-five";
const board = new five.Board();

board.on("ready", () => {
	const button = new five.Button({
		pin: 2,
		isPullup: true
	});
	const piezo = new five.Pin({
		pin: 11
	})

	let lightIsOn = false;

	button.on('down', () => {
		piezo.high();
	});

	button.on("up", () => {
		// lightIsOn = !lightIsOn;
		// lightIsOn ? piezo.play(400) : piezo.off();
		piezo.low();
	})

	// const peizo = new five.Piezo({
	// 	pin: 11
	// });

	// board.repl.inject({
	// 	peizo
	// })
});