/// <reference path="../node_modules/@types/p5/global.d.ts"/>

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
}

(window as any).draw = () => {
	background(0);
	translate(150, 150);
	noFill();
	strokeWeight(9);

	idle(255, 75, 75);

	translate(0, 300);
	idle(75, 255, 75);

	translate(0, 300);
	idle(100, 100, 255);
	
	translate(300, -600);
	loading1();

	translate(0, 300);
	loading2();
}

const size = 200;

function idle(r: number, g: number, b: number) {
	push();

	const tri = TWO_PI / 6;

	stroke(50);
	arc(0, 0, size, size, 0, TWO_PI);
	
	strokeWeight(10);
	stroke(r, g, b);
	rotate((frameCount / 100) % TWO_PI);
	
	arc(0, 0, size, size, 0, tri);
	arc(0, 0, size, size, tri * 2, tri * 3);
	arc(0, 0, size, size, tri * 4, tri * 5);

	pop();
}

function loading1() {
	push();

	stroke(50);
	arc(0, 0, size, size, 0, TWO_PI);
	
	strokeWeight(10);

	const offset = (frameCount / 100) % TWO_PI;

	stroke(255, 50, 50);
	arc(0, 0, size, size, 0 + offset, PI + offset);
	
	stroke(50, 255, 50);
	arc(0, 0, size, size, 0 + (offset * 2.5), (PI / 2) + (offset * 2.5));
	
	stroke(50, 50, 255);
	arc(0, 0, size, size, 0 + (offset * 4), PI / 3 + (offset * 4));


	pop();
}

let flipped = false;
let rot = 0;
const step = 0.002;
function loading2() {
	push();

	rotate((frameCount / 40) % TWO_PI);

	stroke(50);
	arc(0, 0, size, size, 0, TWO_PI);
	
	strokeWeight(10);

	const delta = flipped ? rot : TWO_PI - rot;

	rot = flipped ?
		rot - (delta / 90 + step) :
		rot + (delta / 90 + step);

	if (rot > TWO_PI) {
		rot = TWO_PI;
		flipped = true;
	}

	if (rot < 0) {
		rot = 0;
		flipped = false;
	}

	stroke(255, 0, 0);
	arc(
		0, 0,
		size, size,
		flipped ? TWO_PI : clamp(rot, 0, TWO_PI - 0.01),
		flipped ? TWO_PI - clamp(rot, 0, TWO_PI - 0.01) : TWO_PI
	);

	pop();
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max)