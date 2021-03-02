/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Element, Vector } from "p5";
import { Container } from "./classes/container";
import { Gas } from "./classes/gas";

let container: Container;
let slider: Element;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	container = new Container(
		.05,
		.15,
		new Gas({
			pressure: 101325, // Pa
			temperature: 323.15, // K
			molarMass: 0.0291 // kg / mol
		})
	);

	slider = createSlider(-273, 500);
}

(window as any).draw = () => {
	background(255);
	container.display();
	container.update();

	line(0, 600, width, 600);

	container.gas.temperature = Number(slider.value()) + 273.15;
}