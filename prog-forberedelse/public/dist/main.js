/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(pos) {
        var _this = this;
        this.pos = pos;
        this.state = 'rest';
        // min 5, max 10 seconds
        this.timeBeforeStart = ((Math.random() * 5) + 1) * 1000;
        this.vec = createVector();
        this.acc = createVector();
        this.speed = Math.random() + 0.5;
        Car.cars.push(this);
        setTimeout(function () { return _this.state = 'drive'; }, this.timeBeforeStart);
    }
    Car.prototype.loop = function () {
        this.pos.add(this.vec);
        this.vec.add(this.acc);
        this.vec.mult(0.92);
        this.acc.mult(0);
        if (this.state == 'drive')
            this.applyForce(createVector(this.speed, 0));
        if (this.offscreen())
            this.reset();
        this.draw();
    };
    Car.prototype.draw = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        rect(0, 0, 30, 10);
        if (this.state == 'drive') {
            noStroke();
            fill(255, 50, 50);
            rect(-15 + 2.5, 0, 5, 10);
            fill(255, 255, 50);
            rect(15 - 2.5, 0, 5, 10);
        }
        pop();
    };
    Car.prototype.applyForce = function (f) {
        var forceToAdd = f.copy();
        this.acc.add(forceToAdd);
    };
    Car.prototype.reset = function () {
        var _this = this;
        this.pos.set(-10, random(0, height));
        this.state = 'rest';
        setTimeout(function () { return _this.state = 'drive'; }, this.timeBeforeStart);
    };
    Car.prototype.offscreen = function () {
        return this.pos.x > (width + 15);
    };
    // Statics
    Car.cars = [];
    return Car;
}());
exports.Car = Car;


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
var car_class_1 = __webpack_require__(1);
var angle = 0;
var angleOffset = 0;
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 10; i++) {
        new car_class_1.Car(createVector(random(50, 150), random(0, height)));
    }
};
window.draw = function () {
    background(255);
    car_class_1.Car.cars.forEach(function (car) { return car.loop(); });
};

})();

/******/ })()
;