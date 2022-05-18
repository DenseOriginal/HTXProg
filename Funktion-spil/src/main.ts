/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Enemy } from "./enemy";

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);
	new Enemy();
	setInterval(() => new Enemy(), 200);
}

(window as any).draw = () => {
	background(255);
	Enemy.forEach(cur => cur.draw());
}