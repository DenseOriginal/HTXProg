/// <reference path="../node_modules/@types/p5/global.d.ts"/>
const nerdamer = require("nerdamer/all.min")
import { Element } from "p5";

let inp: Element;
const scaleX = 10;

(window as any).setup = () => {
	createCanvas(400, 400);

	inp = createInput();
}

(window as any).draw = () => {
	background(255);
	try {
		const intersection = solve(inp.value().toString());
		text(`X = ${intersection}`, 10, 20);
	
		line(width / 2, 0, width / 2, height);
		line(0, height / 2, width, height / 2);
	
		translate(width / 2, height / 2);
	
		const [p1, p2] = points(inp.value().toString(), -width / 2, width / 2);
		const [xAxis] = points(inp.value().toString(), 0, 0);
		
		line(p1.x * scaleX, p1.y * scaleX * -1, (p2.x * scaleX), p2.y * scaleX * -1);
	
		circle(intersection * scaleX, 0, 5)
		circle(0, xAxis.y * scaleX * -1, 5)
	} catch (error) {
		text('Error', 10, 20);
		console.log(error);
	}
}


const cache = new Map<string, string>();
function solve(input: string) {
	if (cache.has(input)) return cache.get(input);

	const solv = nerdamer.solve(input, 'x');
	const res = JSON.parse(solv.toDecimal())[0];

	cache.set(input, res);

	return res;
}

type Point = { x: number, y: number };
type SetOfPoints = [Point, Point];

const pointsCahce = new Map<string, SetOfPoints>();
function points(input: string, x1: number, x2: number): SetOfPoints {
	const cacheKey = `${input}-${x1}-${x2}`;
	if (pointsCahce.has(cacheKey)) return pointsCahce.get(cacheKey) as SetOfPoints;

	const [first, second] = input.split('=');

	const eq = nerdamer(`(${first})-(${second})`).buildFunction();

	const points: SetOfPoints = [
		{ x: x1, y: eq(x1) },
		{ x: x2, y: eq(x2) }
	];

	pointsCahce.set(cacheKey, points);

	return points;

}
