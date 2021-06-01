/// <reference path="../node_modules/@types/p5/global.d.ts"/>

const cnvWidth = 600;
const cnvHeight = 400;

let angle = 0;
let angleOffset = 0;

(window as any).setup = () => {
	createCanvas(600, 400);
	angleOffset = random(-0.1, 0.1);
}

(window as any).draw = () => {
	colorMode(HSB, 255);
	background(frameCount % 255, 255, 255);
	translate(width / 2, height / 2);
	rectMode(CENTER);
	noStroke();

	if(frameCount % 30 == 0) angleOffset = random(-0.1, 0.1);
	angle += angleOffset;
	rotate(angle);
	rect(0, 0, 50, 50);
}
