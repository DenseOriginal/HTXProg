/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { ValueMap } from "./helpers";

type Instruction = () => void
const instructions: Instruction[] = [];

(window as any).setup = () => {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
}

(window as any).draw = () => {
    background(255);
    translate(width / 2, height / 2);
    instructions.forEach(f => f());
}

export function createInstructions(trekant: ValueMap<number>) {
    instructions.forEach(instructions.pop);
    instructions.push(() => { line(0, 0, trekant.a, 0); translate(trekant.a, 0) });
    instructions.push(() => rotate(-(180 - trekant.C)));
    instructions.push(() => { line(0, 0, trekant.b, 0); translate(trekant.b, 0) });
    instructions.push(() => rotate(-(180 - trekant.A)));
    instructions.push(() => { line(0, 0, trekant.c, 0); translate(trekant.c, 0) });
    instructions.push(() => rotate(-(180 - trekant.B)));
}