/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import p5, { Vector } from "p5";

let P1: Vector;
let P2: Vector;
let P3: Vector;

let vec1: Vector;
let vec2: Vector;
let acc1: Vector;
let acc2: Vector;

let origin: Vector;
let xAxis: Vector;
let yAxis: Vector;
let zAxis: Vector;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight, WEBGL);
	(window as any).createEasyCam();

	P1 = createVector(0, 0, 0);
	P2 = createVector(50, 0, 30);
	P3 = createVector(0, 50, 30);

	vec1 = createVector(0, 0, 0);
	vec2 = createVector(0, 0, 0);
	acc1 = createVector(0, 0, 0);
	acc2 = createVector(0, 0, 0);

	origin = createVector(0, 0, 0);
	xAxis = createVector(200, 0, 0);
	yAxis = createVector(0, 200, 0);
	zAxis = createVector(0, 0, 200);
}

(window as any).draw = () => {
	background(0);
  lights();
  // box(100);

	//	 Draw axises
	strokeWeight(1.5);
	// X-axis
	stroke(255, 0, 0);
	drawVector(origin, xAxis);
	// Y-axis
	stroke(0, 255, 0);
	drawVector(origin, yAxis);
	// Z-axis
	stroke(0, 0, 255);
	drawVector(origin, zAxis);

	// Draw origin points
	strokeWeight(1);
	stroke(175, 0, 175);
	drawSphere(P1, 4);
	drawSphere(P2, 4);
	drawSphere(P3, 4);


	//		Draw relevant vectors
	strokeWeight(2);

	// Find vectors from P1 to P2 and P1 to P3
	const V1 = P2.sub(P1);
	const V2 = P3.sub(P1);

	stroke(255);
	drawVector(P1, V1);
	drawVector(P1, V2);

	// Get normal vector
	const normal = V1.cross(V2).normalize().mult(50);
	stroke(255, 255, 0);
	drawVector(P1, normal);


	//  Draw Plane
	noStroke();
	fill(175, 100);
	beginShape();
	vertex(solveForX(P1, normal, -200, -200), -200, -200);
	vertex(solveForX(P1, normal, 200, -200), 200, -200);
	vertex(solveForX(P1, normal, 200, 200), 200, 200);
	vertex(solveForX(P1, normal, -200, 200), -200, 200);
	endShape();

	// Dumb shit to animate P2 and P3 nicely
	P2.add(vec1);
	P2.limit(100);
	vec1.add(acc1);
	vec1.mult(0.95);
	acc1.mult(0);
	acc1.add([random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05)]);

	P3.add(vec2);
	P3.limit(100);
	vec2.add(acc2);
	vec2.mult(0.95);
	acc2.mult(0);
	acc2.add([random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05)]);
}


function drawSphere(pos: Vector, radius: number): void {
	push();

	translate(pos.x, pos.y, pos.z);
	sphere(radius);

	pop();
}

function drawVector(origin: Vector, vec: Vector): void {
	line(origin.x, origin.y, origin.z, vec.x, vec.y, vec.z);
}

function solveForX(origin: Vector, normal: Vector, y: number, z: number): number {
	const { x: a, y: b, z: c } = normal;
	const { x: x0, y: y0, z: z0 } = origin;

	const top = a * x0 - b * (y - y0) - c * (z - z0);
	return top / a;
}