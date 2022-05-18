/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Enemy } from "./enemy";
import { Player } from "./player";

const player = new Player(window.innerWidth - 50);

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);
	new Enemy();
	setInterval(() => (focused && new Enemy()), 1000);
}

(window as any).draw = () => {
	background(255, 75);
	Enemy.forEach(cur => cur.draw());

	player.draw();
	player.applyForce(1); // Gravity

	noStroke();
	rect(0, 0, 150, 50);
	text('FPS: ' + frameRate().toFixed(2), 5, 15);
	text('Enemies: ' + Enemy.enemies.length, 5, 25);
}

// Key shit
document.addEventListener('keydown', (event) => keyPressed(event.key.toLowerCase()));
function keyPressed(key: string) {
	if(key == " ") {
		player.applyForce(-20); // Jumpforce upwards
	}
}