/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Vector } from "p5";
import { UFO } from "./ufo";

let objects: UFO[] = [];
export let playerY: number = 0;
export let playerX: number = 0;
const playerSpeed = 5;
let hasToClickForSound = true;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	
	objects.push(new UFO(
		createVector(0, random(0, height)),
		createVector(width, random(0, height)),
	));

	playerY = height / 2;
	playerX = width - 15;
}

(window as any).draw = () => {
	background(255);

	// For testing porpuse
	if(frameCount % 150 == 0) objects.push(new UFO(
		createVector(0, random(0, height)),
		createVector(width, random(0, height)),
	));

	// Loop through the objects array backwards
	// This is to not disturb the order, if we remove any elements
	for(let idx = objects.length - 1; idx > 0; idx--) {
		const object = objects[idx];

		// If the object is off screen, then remove it
		if(object.isToTheRightOfScreen()) {
			objects.splice(idx, 1);
			object.destroy();
			continue;
		}

		object.live();
	}

	// Draw player
	fill(255);
	stroke(0);
	circle(playerX, playerY, 15);

	// Player movement
	playerY = mouseY;
	// if(keyIsPressed) {
	// 	if(keysDown.has('w')) playerY -= playerSpeed;
	// 	if(keysDown.has('s')) playerY += playerSpeed;
	// }

	// Click for sound
	if(hasToClickForSound) {
		fill(255, 50, 50);
		noStroke();
		circle(width / 2, height / 2, 100);
		textAlign(CENTER, CENTER);
		textSize(50);
		fill(0);
		text('Click for sound', width / 2, height / 1.65);
	}
}

// Key shit
const keysDown = new Set();
document.addEventListener('keydown', (event) => keysDown.add(event.key.toLowerCase()));
document.addEventListener('keyup', (event) => keysDown.delete(event.key.toLowerCase()));

(window as any).mousePressed = () => {
	hasToClickForSound = false;
}