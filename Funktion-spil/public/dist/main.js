/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    frameRate(2);
};
window.draw = function () {
    background(255);
    var a = random(1, -1);
    var endPointY = random(0, height);
    console.log({ endPointY: endPointY });
    var b = -(a * (width) - endPointY);
    console.log("y = " + a + "x + " + b);
    stroke(255, 175, 175);
    strokeWeight(2);
    circle(width, endPointY, 10);
    for (var x = 0; x < width; x += 10) {
        var y = a * x + b;
        console.log({ x: x, y: y });
        circle(x, y, 2);
    }
};

/******/ })()
;