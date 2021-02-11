/// <reference path="../node_modules/@types/p5/global.d.ts"/>

const cnvWidth = 600;
const cnvHeight = 400;
let dir = 1;
let x = 0;
let speed = 5;

(window as any).setup = () => {
	createCanvas(cnvWidth, cnvHeight);
}

(window as any).draw = () => {
	background(0);

	circle(x, cnvHeight / 2, 40);
	x += speed * dir;

	if (x >= cnvWidth) { dir = -1 }
	if (x <= 0) { dir = 1 }
}