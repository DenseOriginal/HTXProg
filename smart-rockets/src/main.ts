/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Vector } from "p5";
import { Population } from "./population";

const cnvWidth = window.innerWidth;
const cnvHeight = window.innerHeight;

let target: Vector;
let pop: Population;

(window as any).setup = () => {
	createCanvas(cnvWidth, cnvHeight);
	target = createVector(cnvWidth / 2, 50);
	let spawn = createVector(cnvWidth / 2, cnvHeight - 50);
	pop = new Population(100, 300, target, spawn, 0.001);
	pop.generatePopulation();
}

(window as any).draw = () => {
	background(240);
	fill(0);
	circle(target.x, target.y, 20);
	pop.run();
}