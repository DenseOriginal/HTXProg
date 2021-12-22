/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
var P1;
var P2;
var P3;
var vec1;
var vec2;
var acc1;
var acc2;
var origin;
var xAxis;
var yAxis;
var zAxis;
window.setup = function () {
    createCanvas(windowWidth, windowHeight, WEBGL);
    window.createEasyCam();
    P1 = createVector(0, 0, 0);
    P2 = createVector(50, 0, 30);
    P3 = createVector(0, 50, 30);
    vec1 = createVector(0, 0, 0);
    vec2 = createVector(0, 0, 0);
    acc1 = createVector(0, 0, 0);
    acc2 = createVector(0, 0, 0);
    origin = createVector(0, 0, 0);
    xAxis = createVector(200, 0, 0);
    yAxis = createVector(0, 200, 0);
    zAxis = createVector(0, 0, 200);
};
window.draw = function () {
    background(0);
    lights();
    // box(100);
    //	 Draw axises
    strokeWeight(1.5);
    // X-axis
    stroke(255, 0, 0);
    drawVector(origin, xAxis);
    // Y-axis
    stroke(0, 255, 0);
    drawVector(origin, yAxis);
    // Z-axis
    stroke(0, 0, 255);
    drawVector(origin, zAxis);
    // Draw origin points
    strokeWeight(1);
    stroke(175, 0, 175);
    drawSphere(P1, 4);
    drawSphere(P2, 4);
    drawSphere(P3, 4);
    //		Draw relevant vectors
    strokeWeight(2);
    // Find vectors from P1 to P2 and P1 to P3
    var V1 = P2.sub(P1);
    var V2 = P3.sub(P1);
    stroke(255);
    drawVector(P1, V1);
    drawVector(P1, V2);
    // Get normal vector
    var normal = V1.cross(V2).normalize().mult(50);
    stroke(255, 255, 0);
    drawVector(P1, normal);
    //  Draw Plane
    noStroke();
    fill(175, 100);
    beginShape();
    vertex(solveForX(P1, normal, -200, -200), -200, -200);
    vertex(solveForX(P1, normal, 200, -200), 200, -200);
    vertex(solveForX(P1, normal, 200, 200), 200, 200);
    vertex(solveForX(P1, normal, -200, 200), -200, 200);
    endShape();
    // Dumb shit to animate P2 and P3 nicely
    P2.add(vec1);
    P2.limit(100);
    vec1.add(acc1);
    vec1.mult(0.95);
    acc1.mult(0);
    acc1.add([random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05)]);
    P3.add(vec2);
    P3.limit(100);
    vec2.add(acc2);
    vec2.mult(0.95);
    acc2.mult(0);
    acc2.add([random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05)]);
};
function drawSphere(pos, radius) {
    push();
    translate(pos.x, pos.y, pos.z);
    sphere(radius);
    pop();
}
function drawVector(origin, vec) {
    line(origin.x, origin.y, origin.z, vec.x, vec.y, vec.z);
}
function solveForX(origin, normal, y, z) {
    var a = normal.x, b = normal.y, c = normal.z;
    var x0 = origin.x, y0 = origin.y, z0 = origin.z;
    var top = a * x0 - b * (y - y0) - c * (z - z0);
    return top / a;
}

})();

/******/ })()
;