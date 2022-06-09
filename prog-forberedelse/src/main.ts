/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Car } from "./car.class";

let angle = 0;
let angleOffset = 0;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	for(let i = 0; i < 10; i++) {
		new Car(createVector(random(50, 150), random(0, height)));
	}
}

(window as any).draw = () => {
	background(255);

	Car.cars.forEach(car => car.loop());
}
