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

const button = document.getElementById('solveButton');
const inputElement = document.getElementById('equation') as HTMLInputElement;
const x0Input = document.getElementById('x-nul') as HTMLInputElement;

const animationOverFrames = 30;
const zoomScale = 10;

let f: Func = (x: number) => Math.cos(x) - x**3;
let x0 = 0.5;
let rootFinder = newtonsMethod(f, x0);

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
	for (let x = -(width / 2 / zoomScale); x < (width / 2 / zoomScale); x += 0.01) {
		vertex(x * zoomScale, -f(x) * zoomScale);
	}
	endShape();

	if (frameCount % animationOverFrames == 0 && !nextRoot.done) {
		prevRoot = nextRoot.value.root;
		nextRoot = rootFinder.next();
	}

	const { root, iterations } = nextRoot.value;

	// Draw the root on the graph
	strokeWeight(4);
	stroke(0, 0, 255);
	fill(0, 0, 255);
	circle(root * zoomScale, -f(root) * zoomScale, 3);

	// Print the root and number of iterations
	fill(0);
	noStroke();
	text(`Root: ${root.toFixed(5)}`, 20, 20);
	text(`Iterations: ${iterations}`, 20, 40);
};

const mapInputToEquation = (input: string) => {
    if (!input.includes('=')) return input;

    const [first, second] = input.split('=');
    return `(${first})-(${second})`;
}

// Listeners
button?.addEventListener('click', () => {
    listener();
})

inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        listener();
    }
});

function listener() {
    const input = inputElement.value;
    if (!input) return alert('Input function');
	const mappedEquation = mapInputToEquation(input);
	
    f = (x: number) => eval(mappedEquation);
    x0 = Number(x0Input.value || 0);
	rootFinder = newtonsMethod(f, x0);
	
	prevRoot = x0;
	nextRoot = rootFinder.next();
	
    loop();
}