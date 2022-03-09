/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UFO = void 0;
var colors_1 = __webpack_require__(2);
// Y translate
var yTrans = 45;
var UFO = /** @class */ (function () {
    function UFO(startingPoint, endPoint, speed) {
        if (speed === void 0) { speed = random(3, 7); }
        this.startingPoint = startingPoint;
        this.endPoint = endPoint;
        this.speed = speed;
        this.colors = new colors_1.ColorSet();
        this.scale = random(0.5, 0.8);
        this.wobbleOffset = random(0, 360);
        this.wobbleSpeed = random(2, 5);
        this.pos = startingPoint.copy();
        this.direction = endPoint.copy().sub(startingPoint).normalize().mult(speed);
    }
    UFO.prototype.live = function () {
        this.move();
        this.draw();
    };
    UFO.prototype.draw = function () {
        // // Debug stuff
        // stroke(255, 150, 150, 150);
        // line(this.pos.x, this.pos.y, this.endPoint.x, this.endPoint.y);
        // noFill();
        // strokeWeight(1.5);
        // stroke(150, 255, 150, 150);
        // circle(this.pos.x, this.pos.y, 50 * 2 * this.scale);
        push();
        translate(this.pos.x, this.pos.y);
        scale(this.scale);
        // Add a little bit of wobble
        rotate(sin(this.wobbleOffset + frameCount * this.wobbleSpeed) * 5);
        stroke(40, 150);
        // Dome
        fill(this.colors.domeColor);
        arc(0, 30 - yTrans, 40, 40, 180, 0);
        // Upper shell
        fill(this.colors.shellColor);
        arc(0, 40 - yTrans, 100, 40, 180, 0);
        // Lower shell
        fill(this.colors.shellColorDark);
        ellipse(0, 40 - yTrans, 100, 10);
        // Light underneath
        noStroke();
        fill(this.colors.lightsColor);
        quad(-15, 43 - yTrans, 15, 43 - yTrans, 25, 85 - yTrans, -25, 85 - yTrans);
        arc(0, 43 - yTrans, 30, 7, 180, 0);
        pop();
    };
    UFO.prototype.move = function () {
        this.pos.y += sin(this.wobbleOffset + frameCount * this.wobbleSpeed) * 2;
        this.pos.add(this.direction);
    };
    UFO.prototype.isToTheRightOfScreen = function () {
        return this.pos.x - (50 * 2 * this.scale) > width;
    };
    return UFO;
}());
exports.UFO = UFO;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorSet = void 0;
var ColorSet = /** @class */ (function () {
    function ColorSet() {
        this.shellColor = randomPastelColor();
        this.shellColorDark = lerpColor(this.shellColor, color(0), 0.1);
        this.domeColor = randomPastelColor();
        this.lightsColor = randomPastelColor();
        this.lightsColor.setAlpha(175);
    }
    return ColorSet;
}());
exports.ColorSet = ColorSet;
function randomPastelColor() {
    return color(random(140, 255), random(140, 255), random(140, 255));
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ufo_1 = __webpack_require__(1);
var objects = [];
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    objects.push(new ufo_1.UFO(createVector(0, random(0, height)), createVector(width, random(0, height))));
};
window.draw = function () {
    background(255);
    if (frameCount % 60 == 0)
        objects.push(new ufo_1.UFO(createVector(0, random(0, height)), createVector(width, random(0, height))));
    // Loop through the objects array backwards
    // This is to not disturb the order, if we remove any elements
    for (var idx = objects.length - 1; idx > 0; idx--) {
        var object = objects[idx];
        // If the object is off screen, then remove it
        if (object.isToTheRightOfScreen()) {
            objects.splice(idx, 1);
            continue;
        }
        object.live();
    }
};

})();

/******/ })()
;