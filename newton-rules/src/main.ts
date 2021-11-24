/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Vector } from "p5";

let pos!: Vector;
let vec!: Vector;
let acc!: Vector;
let mass = 5;
let radius = 10;

let pixelsPerM!: number;
const screenLengthInMeters = 100; // m

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);

	pos = createVector(0, height / 2);
	vec = createVector(0, 0);
	acc = createVector(0, 0);

	pixelsPerM = width / screenLengthInMeters;

	setInterval(() => applyForce(createVector(100, 0)), 2000);
}

(window as any).draw = () => {
	background(255);
	circle(pos.x, pos.y, radius);
	pos.add(vectorToPixels(vec));
	vec.add(acc);
	vec.mult(0.995);
	acc.mult(0);

	checkBounds();
	applyForce(createVector(0, 9.82));
}

// Input vector is expected to be in meters
function applyForce(f: Vector) {
	const forceToAdd = f.copy().div(mass).div(60);
	acc.add(forceToAdd);
}

function keyPressed(key: string) {
	if(key == " ") {
		applyForce(createVector(0, -50));
		console.log(acc);
	}
}

// If the ball moves off the screen
// Loop it back around
function checkBounds() {
	if(pos.x > width) pos.x = 0;
	if(pos.x < 0) pos.x = width;

	if(pos.y > height) { vec.y = 0; pos.y = height; }
}


function metersToPixels(meters: number) {
	return meters * pixelsPerM;
}

function vectorToPixels(f: Vector): Vector {
	return f.copy().mult(pixelsPerM);
}

// Key shit
document.addEventListener('keydown', (event) => keyPressed(event.key.toLowerCase()));