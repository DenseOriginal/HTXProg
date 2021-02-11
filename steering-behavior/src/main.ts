/// <reference path="../node_modules/@types/p5/global.d.ts"/>
import { Vector } from "p5";
import { Vehicle } from "./vehicle";

const cnvWidth = 400;
const cnvHeight = 400;

let v1: Vehicle;

let vehicles: Vehicle[] = [];
let ball: Vector;

let vNum = 50;
let distance = 100;

(window as any).setup = () => {
	createCanvas(cnvWidth, cnvHeight);

	v1 = new Vehicle(cnvWidth / 2, cnvHeight / 2);
	ball = createVector(0, 0);

	let x = 0;
	let y = 0;

	for(let i = 0; i < vNum; i++) {
		let x_ = (width / 2) + sin(x) * distance;
		let y_ = (height / 2) + cos(y) * distance;
		let newVehicle = new Vehicle(x_, y_);

		vehicles.push(newVehicle);
	
		x += TWO_PI / vNum;
		y += TWO_PI / vNum;
	}
}

(window as any).draw = () => {
	background(120);

	circle(ball.x, ball.y, 20);
	let newX = width / 2 + (sin(frameCount / 40) * distance);
	let newY = height / 2 + (cos(frameCount / 40) * distance);

	ball.set(newX, newY);

	vehicles.forEach(v => {
		let flee = v.flee(ball);
		flee.mult(5);
		v.applyForce(flee);

		v.behaviors();
		v.update();
		v.show();
	})
}