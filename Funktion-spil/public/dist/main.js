/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enemy = void 0;
var linear_1 = __webpack_require__(2);
var Enemy = /** @class */ (function () {
    function Enemy() {
        this.path = new linear_1.LinearPath();
        this.x = 0;
        this.y = this.path.calculate(this.x);
        this.offset = frameCount / 3;
        Enemy.enemies.push(this);
    }
    Enemy.prototype.draw = function () {
        push();
        noStroke();
        colorMode(HSB);
        fill(this.offset % 360, 360, 360);
        this.y = this.path.calculate(this.x);
        translate(this.x, height - this.y);
        rotate(-this.path.getAngle(this.x));
        square(0, 0, 50);
        pop();
        this.x += 3;
        if (this.x > width)
            Enemy.removeSelf(this);
    };
    Enemy.removeSelf = function (t) {
        var index = Enemy.enemies.indexOf(t);
        Enemy.enemies.splice(index, 1);
    };
    Enemy.enemies = [];
    Enemy.forEach = function (fn) { return Enemy.enemies.forEach(fn); };
    return Enemy;
}());
exports.Enemy = Enemy;


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinearPath = void 0;
var generic_1 = __webpack_require__(3);
var LinearPath = /** @class */ (function (_super) {
    __extends(LinearPath, _super);
    function LinearPath() {
        var _this = _super.call(this) || this;
        var x1 = 0;
        var x2 = width;
        var randomY1 = random(0, height);
        var randomY2 = random(0, height);
        _this.a = (randomY1 - randomY2) / (x1 - x2);
        _this.b = randomY1;
        return _this;
    }
    LinearPath.prototype.calculate = function (x) {
        return (this.a * x) + this.b;
    };
    return LinearPath;
}(generic_1.GenericPath));
exports.LinearPath = LinearPath;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenericPath = void 0;
var GenericPath = /** @class */ (function () {
    function GenericPath() {
    }
    GenericPath.prototype.getAngle = function (x) {
        return atan(2 / (this.calculate(x - 1) - this.calculate(x + 1))) + 90;
    };
    return GenericPath;
}());
exports.GenericPath = GenericPath;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
var enemy_1 = __webpack_require__(1);
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    angleMode(DEGREES);
    new enemy_1.Enemy();
    setInterval(function () { return new enemy_1.Enemy(); }, 200);
};
window.draw = function () {
    background(255);
    enemy_1.Enemy.forEach(function (cur) { return cur.draw(); });
};

})();

/******/ })()
;