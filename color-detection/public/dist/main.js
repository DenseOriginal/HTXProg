/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
var capture;
var stepSize = 1;
var dR = 255;
var dG = 0;
var dB = 0;
var slider;
var mult = 1.5;
var wii = 640 * mult;
var hee = 480 * mult;
window.setup = function () {
    createCanvas(wii, hee);
    slider = createSlider(0, 255, 100);
    // specify multiple formats for different browsers
    capture = createCapture(VIDEO);
    capture.size(wii, hee);
    capture.hide();
    noStroke();
    fill(0);
    console.log(slider);
};
window.draw = function () {
    background(255);
    capture.loadPixels();
    for (var y = 0; y < height; y += stepSize) {
        for (var x = 0; x < width; x += stepSize) {
            var i = (x + y * width) * 4;
            var r = (capture.pixels[i]);
            var g = (capture.pixels[i + 1]);
            var b = (capture.pixels[i + 2]);
            var distSq = Math.pow((dR - r), 2) + Math.pow((dG - g), 2) + Math.pow((dB - b), 2);
            var dist_1 = sqrt(distSq);
            if (dist_1 < slider.value()) {
                fill(r, g, b);
                rect(x, y, stepSize, stepSize);
            }
        }
    }
    text(slider.value(), 10, 10);
};

})();

/******/ })()
;