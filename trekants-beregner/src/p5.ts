/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { ValueMap, cos, sin } from "./helpers";

let trekant: ValueMap<number> | undefined;

(window as any).setup = () => {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
}

(window as any).draw = () => {
    background(255);
    move(width / 2, height / 2);

    if(trekant) {
        beginShape();
        const aX = 0;
        const aY = 0;
        vertex(aX, aY);
        
        const bX = trekant.a;
        const bY = 0;
        vertex(bX, bY);

        const cX = trekant.c * cos(trekant.B);
        const cY = trekant.c * -sin(trekant.B);
        vertex(cX, cY);
        endShape(CLOSE);
    }
}

export function createInstructions(_trekant: ValueMap<number>) {
    // instructions.forEach(() => instructions.pop());
    trekant = _trekant;
}

const origin = { x: 0, y: 0 };
function move(x: number, y: number) { translate(x, y); origin.x += x; origin.y += y; }