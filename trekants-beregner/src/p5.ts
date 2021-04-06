/// <reference path="../node_modules/@types/p5/global.d.ts"/>

(window as any).setup = () => {
    createCanvas(windowWidth, windowHeight);
}

(window as any).draw = () => {
    background(255);
}