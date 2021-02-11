/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Vector } from "p5";
import { Anchor } from "./anchor";
import { Ball } from "./ball";
import { Spring } from "./spring";

let ball: Ball;
let anchor: Anchor;
let gravity: Vector;
let wind: Vector;
let spring: Spring;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);

	ball = new Ball(createVector(width/2, height/3));
	anchor = new Anchor(createVector(width/3, height / 3), 20);
	spring = new Spring(ball, anchor, 'FIT', 0.2);
	gravity = createVector(0, 0.5);
	wind = createVector(0, 0);
}

(window as any).draw = () => {
	background(255);

	ball.applyForce(gravity);
	ball.applyForce(wind);
	ball.update();
	ball.display();

	anchor.display();

	spring.update();
	spring.display();

	wind.set(
		constrain(wind.x + random(-0.05, 0.05), -0.7, 0.7),
		wind.y
	);
}