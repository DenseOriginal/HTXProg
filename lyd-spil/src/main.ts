/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { UFO } from "./ufo";

let objects: UFO[] = [];

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	
	objects.push(new UFO(
		createVector(0, random(0, height)),
		createVector(width, random(0, height)),
	));
}

(window as any).draw = () => {
	background(255);

	if(frameCount % 60 == 0) objects.push(new UFO(
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
			continue;
		}

		object.live();
	}
}
