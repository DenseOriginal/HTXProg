/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Image } from "p5";

let img: Image;
let arcLength = 1;
let numOfShells = 45;
let shellSpacing: number;

(window as any).preload = () => {
	img = loadImage('./cd95668afce258b9537e7b9f8816c53a.png');
}

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	shellSpacing = (img.width / 2) / numOfShells;
	noLoop();
	img.loadPixels();
}

(window as any).draw = () => {
	background(255);
	translate(width / 2, height / 2);
	// image(img, -(img.width / 2), -(img.height / 2));
	strokeWeight(1);
	
	noFill();

	for (let shellIdx = 0; shellIdx < numOfShells; shellIdx++) {
		let omkreds = (shellSpacing * shellIdx) * 2 * PI;
		let arcRotation = arcLength + 1 * (360 / omkreds);
		
		for(let idx = 0; idx < 360 / arcRotation; idx++) {
			// stroke(random(0, 255), random(0, 255), random(0, 255))
			let x = cos(arcRotation * idx) * (shellSpacing * shellIdx);
			let y = sin(arcRotation * idx) * (shellSpacing * shellIdx);
			let pixelColor = img.get((img.width / 2) + x, (img.height / 2) + y);
			stroke(pixelColor[0], pixelColor[1], pixelColor[2]);

			arc(
				0,
				0,
				shellSpacing * shellIdx * 2,
				shellSpacing * shellIdx * 2,
				arcRotation * idx,
				arcRotation * idx + arcRotation - 1
			);

		}
	}
}
