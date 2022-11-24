/// <reference path="../node_modules/@types/p5/global.d.ts"/>

const button = document.getElementById('solveButton');
const inputElement = document.getElementById('equation') as HTMLInputElement;
const zoomSliderElement = document.getElementById('zoomSlider') as HTMLInputElement;
let storedEquation = "";

const defaultScale = 50;

(window as any).setup = () => {
    createCanvas(windowWidth, windowHeight);
}

(window as any).draw = () => {
    const zoomScale = Number(zoomSliderElement.value);

    background(255);

    drawGrid(zoomScale);

    if (!storedEquation) return;

    try {
        const eq = mapInputToEquation(storedEquation);
        const a = getACoefficient(eq);
        const b = getBCoefficient(eq);
        const xAxisIntersection = solveForX(a, b, 0);

        strokeWeight(0.3);
        text(`Intersection with x-axis = ${xAxisIntersection}`, 10, 20);

        translate(width / 2, height / 2);

        scale(defaultScale * zoomScale);
        strokeWeight(1 / (defaultScale * zoomScale))

        const lowerScreenIntersectionX = solveForX(a, b, height / -2);
        const upperScreenIntersectionX = solveForX(a, b, height / 2);

        push();
        strokeWeight(2 / (defaultScale * zoomScale))
        stroke(100, 100, 255);
        line(
            lowerScreenIntersectionX,
            height / 2,
            upperScreenIntersectionX,
            height / -2
        );
        pop();

        circle(0, b * -1, 5 / (defaultScale * zoomScale))
        circle(xAxisIntersection, 0, 5 / (defaultScale * zoomScale))
    } catch (error) {
        console.error(error);
        text('Error, check console', 10, 20);
        noLoop();
    }
}

const mapInputToEquation = (input: string) => {
    if (!input.includes('=')) return input;

    const [first, second] = input.split('=');
    return `(${first})-(${second})`;
}


const solve = (eq: string, x: number) =>
    eval(eq);

const getBCoefficient = (eq: string) =>
    solve(eq, 0);

const getACoefficient = (eq: string) => {
    const pointA = solve(eq, 1);
    const pointB = solve(eq, 2);

    // (y2 - y1) / deltaX;
    return (pointB - pointA) / 1;
}

const solveForX = (a: number, b: number, y: number) =>
    (y - b) / a;

const getPoint = (eq: string, x: number): [number, number] =>
    [x, solve(eq, x)];

const getInvertedPoint = (eq: string, x: number): [number, number] =>
    [x, -solve(eq, x)];

function drawGrid(zoomScale: number) {
    stroke(200);
    strokeWeight(0.5);

    // Vertical lines
    for (let x = 0; x < width / 2; x += defaultScale * zoomScale) {
        line(
            (width / 2) + x,
            0,
            (width / 2) + x,
            height
        );

        line(
            (width / 2) - x,
            0,
            (width / 2) - x,
            height
        );
    }

    // Horizonral lines
    for (let y = 0; y < height / 2; y += defaultScale * zoomScale) {
        line(
            0,
            (height / 2) + y,
            width,
            (height / 2) + y,
        );

        line(
            0,
            (height / 2) - y,
            width,
            (height / 2) - y,
        );
    }

    strokeWeight(1);
    stroke(0);
    // Background lines stuff
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
}

const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

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

    storedEquation = input;
    loop();
}

let waiting = false;
document.addEventListener('wheel', (e) => {
    if (!waiting) {
        requestAnimationFrame(() => {
            const zoomScale = Number(zoomSliderElement.value);
            const deltaZoom = e.deltaY / 100;
            
            zoomSliderElement.value = clamp(zoomScale + deltaZoom, 0.1, 10).toString();

            waiting = false;
        });

        waiting = true;
    }
});
