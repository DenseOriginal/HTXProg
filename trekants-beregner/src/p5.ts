/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { ValueMap, cos, sin } from "./helpers";

let trekant: ValueMap<number> | undefined;

(window as any).setup = () => {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
}

(window as any).draw = () => {
    background(255);
    translate(width / 2, height / 2);

    if(trekant) {
        const aX = 0;
        const aY = 0;
        
        const bX = trekant.a;
        const bY = 0;
        
        const cX = trekant.c * cos(trekant.B);
        const cY = trekant.c * -sin(trekant.B);

        const averageX = (aX + bX + cX) / 3;
        const averageY = (aY + bY + cY) / 3;

        translate(-averageX, -averageY);

        beginShape();
        vertex(aX, aY);
        vertex(bX, bY);
        vertex(cX, cY);
        endShape(CLOSE);
    }
}

export function createInstructions(_trekant: ValueMap<number>) {
    // instructions.forEach(() => instructions.pop());
    trekant = _trekant;
}
