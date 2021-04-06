/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Vector } from "p5";

let ball: Vector;
let velocity: Vector;
let acceleration: Vector;

let ballSize = 20;
let bouncyness = 0.7;

(window as any).setup = () => {
	createCanvas(400, 400);


	ball = createVector(width / 2, height / 2);
	velocity = createVector(0, 0);
	acceleration = createVector(0, 0);

}
(window as any).draw = () => {
	background('#FFFFFF');
	fill('#ECECEC');

	circle(ball.x, ball.y, ballSize);

	acceleration.add([activator(rotationY / 100), activator(rotationX / 100)]);
	velocity.add(acceleration);
	velocity.mult(0.995)
	ball.add(velocity);
	acceleration.mult(0);
	ball.set(
		constrain(ball.x, ballSize / 2, width - ballSize / 2), 
		constrain(ball.y, ballSize / 2, height - ballSize / 2)
	);

	if (ball.x <= ballSize / 2 || ball.x >= width - ballSize / 2) {
		velocity.x *= -bouncyness;
	}

	if (ball.y <= ballSize / 2 || ball.y >= height - ballSize / 2) {
		velocity.y *= -bouncyness;
	}

	push();
	translate(ball.x, ball.y);
	line(0, 0, velocity.x * 10, velocity.y * 10)
	pop();
}

function activator(n: number): number {
	let step = 0.05;

	if (Math.abs(n) < step) {
		return 0;
	} else {
		const minusStep = n < 0 ? step : -step;
		return n + minusStep;
	}
}