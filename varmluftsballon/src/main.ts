/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Container } from "./classes/container";
import { toKelvin } from "./helpers/temperature";

let container: Container;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	container = new Container({
		width: 50,
		height: 50,
		volume: 1,
		gasPreset: {
			molarMass: 0.0291,
			color: {r: 100, g: 100, b: 100, alpha: 100}
		},
		temperature: toKelvin(50)
	});
	container.position = createVector(width / 2, height);
}

(window as any).draw = () => {
	background(255);
	container.update();
	container.display();
}