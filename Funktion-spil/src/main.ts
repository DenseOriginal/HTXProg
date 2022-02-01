/// <reference path="../node_modules/@types/p5/global.d.ts"/>

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	frameRate(2);
}

(window as any).draw = () => {
	background(255);
	const a = random(1, -1);
	const endPointY = random(0, height);
	console.log({ endPointY });
	
	const b = -(a * (width) - endPointY);
	console.log(`y = ${a}x + ${b}`);
	

	stroke(255, 175, 175);
	strokeWeight(2);
	circle(width, endPointY, 10);

	for(let x = 0; x < width; x += 10) {
		const y = a * x + b;
		console.log({ x, y });
		
		circle(x, y, 2);
	}
}