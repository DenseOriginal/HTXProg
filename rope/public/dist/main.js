/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var anchor_1 = __webpack_require__(2);
var ball_1 = __webpack_require__(1);
var spring_1 = __webpack_require__(3);
var ball;
var anchor;
var gravity;
var wind;
var spring;
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    ball = new ball_1.Ball(createVector(width / 2, height / 3));
    anchor = new anchor_1.Anchor(createVector(width / 3, height / 3), 20);
    spring = new spring_1.Spring(ball, anchor, 'FIT', 0.2);
    gravity = createVector(0, 0.5);
    wind = createVector(0, 0);
};
window.draw = function () {
    background(255);
    ball.applyForce(gravity);
    ball.applyForce(wind);
    ball.update();
    ball.display();
    anchor.display();
    spring.update();
    spring.display();
    wind.set(constrain(wind.x + random(-0.05, 0.05), -0.7, 0.7), wind.y);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
var Ball = /** @class */ (function () {
    function Ball(pos, radius, bouncyness, mass) {
        if (pos === void 0) { pos = createVector(width / 2, height / 2); }
        if (radius === void 0) { radius = 10; }
        if (bouncyness === void 0) { bouncyness = 0.2; }
        if (mass === void 0) { mass = 10; }
        this.pos = pos;
        this.radius = radius;
        this.bouncyness = bouncyness;
        this.mass = mass;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
    }
    Ball.prototype.applyForce = function (f) {
        var newForce = f.copy();
        this.acceleration.add(newForce);
    };
    Ball.prototype.update = function () {
        this.checkEdges();
        this.velocity.add(this.acceleration);
        this.velocity.mult(0.99);
        this.pos.add(this.velocity);
        this.acceleration.mult(0);
        this.pos.set(constrain(this.pos.x, this.radius, width - this.radius), constrain(this.pos.y, -Infinity, height - this.radius));
    };
    Ball.prototype.display = function () {
        stroke(0);
        strokeWeight(1);
        circle(this.pos.x, this.pos.y, this.radius * 2);
        if (this.pos.y < -this.radius) {
            stroke(255, 100, 100);
            strokeWeight(3);
            line(this.pos.x, 5, this.pos.x, 25);
        }
    };
    Ball.prototype.checkEdges = function () {
        if (this.pos.x - this.radius <= 0 || this.pos.x >= width - this.radius) {
            this.velocity.x *= -this.bouncyness;
        }
        if (this.pos.y >= height - this.radius) {
            this.velocity.y *= -this.bouncyness;
        }
    };
    return Ball;
}());
exports.Ball = Ball;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Anchor = void 0;
var Anchor = /** @class */ (function () {
    function Anchor(pos, size, mass) {
        if (size === void 0) { size = 5; }
        if (mass === void 0) { mass = Infinity; }
        this.pos = pos;
        this.size = size;
        this.mass = mass;
        this.velocity = createVector();
    }
    Anchor.prototype.display = function () {
        push();
        rectMode(CENTER);
        fill(0);
        square(this.pos.x, this.pos.y, this.size);
        pop();
    };
    Anchor.prototype.applyForce = function (f) { };
    return Anchor;
}());
exports.Anchor = Anchor;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Spring = void 0;
var Spring = /** @class */ (function () {
    function Spring(mass1, mass2, springLength_, stiffnes) {
        this.mass1 = mass1;
        this.mass2 = mass2;
        this.stiffnes = stiffnes;
        this.frictionConstant = 0.002;
        if (springLength_ == 'FIT') {
            this.springLength = mass1.pos.copy().sub(mass2.pos).mag();
        }
        else {
            this.springLength = springLength_;
        }
        console.log('Spring length: ' + this.springLength);
    }
    Spring.prototype.display = function () {
        push();
        if (this.mass1.pos.dist(this.mass2.pos) > this.springLength) {
            stroke(255, 100, 100);
        }
        else {
            stroke(0);
        }
        line(this.mass1.pos.x, this.mass1.pos.y, this.mass2.pos.x, this.mass2.pos.y);
        pop();
    };
    Spring.prototype.update = function () {
        var springVector = this.mass1.pos
            .copy()
            .sub(this.mass2.pos);
        var len = springVector.mag();
        var force = createVector();
        if (len != 0) {
            var forceToAdd = springVector.copy()
                .div(len)
                .mult(-1)
                .mult(len - this.springLength)
                .mult(this.stiffnes);
            force.add(forceToAdd);
            forceToAdd = this.mass1.velocity.copy()
                .sub(this.mass2.velocity)
                .mult(-1)
                .mult(this.frictionConstant);
            force.add(forceToAdd);
            this.mass1.applyForce(force);
            this.mass2.applyForce(force);
        }
    };
    return Spring;
}());
exports.Spring = Spring;


/***/ })
/******/ ]);