/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function() {


/// <reference path="../node_modules/@types/p5/global.d.ts"/>
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
};
window.draw = function () {
    background(0);
    stroke('white');
    strokeWeight(2);
    minCirkel(200, 250, 50, 0.01);
    noLoop();
};
function minCirkel(cX, cY, r, resolution) {
    if (resolution === void 0) { resolution = 1; }
    // Arrays til top og bund punkterne, dette er så at vi kan lave en fin cirkel bagefter
    // Istede for en masse punkter
    var top = [];
    var bottom = [];
    // Vi behøver ikke at loope over hele canvassas
    // Fordi vi ved at en cirkel ikke er større end dens diameter
    for (var x = cX - r; x < cX + r; x += resolution) {
        // Koefficienter
        var a = 1; // A er lidt ligemeget i dette tilfælde fordi den er 1
        var b = 2 * cY;
        var c = Math.pow(x, 2) + Math.pow(cX, 2) - 2 * x * cX + Math.pow(cY, 2) - Math.pow(r, 2);
        var D = Math.pow(b, 2) - 4 * a * c;
        // Hvis D  er mindre end nul så er der ikke nogen løsninger
        // derfor kan vi bare skippe til næste iteration
        if (D < 0)
            continue;
        var y1 = (b + sqrt(D)) / 2;
        top.push({ x: x, y: y1 }); // Tilføj punktet til listen
        var y2 = (b - sqrt(D)) / 2;
        top.push({ x: x, y: y2 }); // Tilføj punktet til listen
    }
    // Loop over alle punkterne i cirklen, hvor vi starter med den øverste halvdel af punkter
    // Og bagefter den nederste halvden af punkter, men i omvendt rækkefølge
    // Fordi ellers for man en streg lige over midten af cirklen
    beginShape();
    for (var _i = 0, _a = __spreadArrays(top, (bottom.reverse())); _i < _a.length; _i++) {
        var p = _a[_i];
        vertex(p.x, p.y);
    }
    endShape();
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[0]();
/******/ 	
/******/ })()
;