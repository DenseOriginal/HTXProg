/// <reference path="../node_modules/@types/p5/global.d.ts"/>

type Func = (x: number) => number;

const derivative = (f: Func, h = 1e-5) =>
    (x: number) => (f(x + h) - f(x)) / h;

function* newtonsMethod(f: Func, x0: number) {
    let x = x0;
	let iterations = 0;
	const fPrime = derivative(f);

    while (Math.abs(f(x)) > 1e-5) {
		iterations++;

        yield { root: x, iterations };
        x = x - f(x) / fPrime(x);
    }

	return { root: x, iterations };
}

const animationOverFrames = 30;
const zoomScale = 100;

const f: Func = (x: number) => Math.cos(x) - x**3;
const x0 = 0.5;
const rootFinder = newtonsMethod(f, x0);

let prevRoot = x0;
let nextRoot = rootFinder.next();

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
};

(window as any).draw = () => {
	background(255);

	// Draw the x-axis and y-axis
	strokeWeight(1);
	stroke(150);
	line(0, height / 2, width, height / 2);
	line(width / 2, 0, width / 2, height);

	translate(width / 2, height / 2);

	// Draw the function
	strokeWeight(2);
	stroke(0);
	fill(0, 0, 0, 0);
	beginShape();
	for (let x = -10; x < 10; x += 0.01) {
		vertex(x * zoomScale, -f(x) * zoomScale);
	}
	endShape();

	if (frameCount % animationOverFrames == 0 && !nextRoot.done) {
		prevRoot = nextRoot.value.root;
		nextRoot = rootFinder.next();
	}

	const { root, iterations } = nextRoot.value;
	const lerpedRoot = lerp(prevRoot, root, (frameCount % animationOverFrames) / animationOverFrames);

	// Draw the root on the graph
	strokeWeight(4);
	// stroke(0, 0, 255);
	// fill(0, 0, 255);
	// circle(root * zoomScale, -f(root) * zoomScale, 5);

	stroke(255, 0, 0);
	fill(255, 0, 0);
	circle((lerpedRoot) * zoomScale, 0, 3);

	// Print the root and number of iterations
	fill(0);
	noStroke();
	text(`Root: ${root.toFixed(5)}`, 20, 20);
	text(`Iterations: ${iterations}`, 20, 40);
};
