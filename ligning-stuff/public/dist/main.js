/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
var button = document.getElementById('solveButton');
var inputElement = document.getElementById('equation');
var zoomSliderElement = document.getElementById('zoomSlider');
var storedEquation = "";
var defaultScale = 50;
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
};
window.draw = function () {
    var zoomScale = Number(zoomSliderElement.value);
    background(255);
    drawGrid(zoomScale);
    if (!storedEquation)
        return;
    try {
        var eq = mapInputToEquation(storedEquation);
        var a = getACoefficient(eq);
        var b = getBCoefficient(eq);
        var xAxisIntersection = solveForX(a, b, 0);
        strokeWeight(0.3);
        text("Intersection with x-axis = " + xAxisIntersection, 10, 20);
        translate(width / 2, height / 2);
        scale(defaultScale * zoomScale);
        strokeWeight(1 / (defaultScale * zoomScale));
        var lowerScreenIntersectionX = solveForX(a, b, height / -2);
        var upperScreenIntersectionX = solveForX(a, b, height / 2);
        push();
        strokeWeight(2 / (defaultScale * zoomScale));
        stroke(100, 100, 255);
        line(lowerScreenIntersectionX, height / 2, upperScreenIntersectionX, height / -2);
        pop();
        circle(0, b * -1, 5 / (defaultScale * zoomScale));
        circle(xAxisIntersection, 0, 5 / (defaultScale * zoomScale));
    }
    catch (error) {
        console.error(error);
        text('Error, check console', 10, 20);
        noLoop();
    }
};
var mapInputToEquation = function (input) {
    if (!input.includes('='))
        return input;
    var _a = input.split('='), first = _a[0], second = _a[1];
    return "(" + first + ")-(" + second + ")";
};
var solve = function (eq, x) {
    return eval(eq);
};
var getBCoefficient = function (eq) {
    return solve(eq, 0);
};
var getACoefficient = function (eq) {
    var pointA = solve(eq, 1);
    var pointB = solve(eq, 2);
    // (y2 - y1) / deltaX;
    return (pointB - pointA) / 1;
};
var solveForX = function (a, b, y) {
    return (y - b) / a;
};
var getPoint = function (eq, x) {
    return [x, solve(eq, x)];
};
var getInvertedPoint = function (eq, x) {
    return [x, -solve(eq, x)];
};
function drawGrid(zoomScale) {
    stroke(200);
    strokeWeight(0.5);
    // Vertical lines
    for (var x = 0; x < width / 2; x += defaultScale * zoomScale) {
        line((width / 2) + x, 0, (width / 2) + x, height);
        line((width / 2) - x, 0, (width / 2) - x, height);
    }
    // Horizonral lines
    for (var y = 0; y < height / 2; y += defaultScale * zoomScale) {
        line(0, (height / 2) + y, width, (height / 2) + y);
        line(0, (height / 2) - y, width, (height / 2) - y);
    }
    strokeWeight(1);
    stroke(0);
    // Background lines stuff
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
}
var clamp = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
};
// Listeners
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    listener();
});
inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        listener();
    }
});
function listener() {
    var input = inputElement.value;
    if (!input)
        return alert('Input function');
    storedEquation = input;
    loop();
}
var waiting = false;
document.addEventListener('wheel', function (e) {
    if (!waiting) {
        requestAnimationFrame(function () {
            var zoomScale = Number(zoomSliderElement.value);
            var deltaZoom = e.deltaY / 100;
            zoomSliderElement.value = clamp(zoomScale + deltaZoom, 0.1, 10).toString();
            waiting = false;
        });
        waiting = true;
    }
});

/******/ })()
;