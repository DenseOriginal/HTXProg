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

Object.defineProperty(exports, "__esModule", { value: true });
var vehicle_1 = __webpack_require__(1);
var cnvWidth = 400;
var cnvHeight = 400;
var v1;
var vehicles = [];
var ball;
var vNum = 50;
var distance = 100;
window.setup = function () {
    createCanvas(cnvWidth, cnvHeight);
    v1 = new vehicle_1.Vehicle(cnvWidth / 2, cnvHeight / 2);
    ball = createVector(0, 0);
    var x = 0;
    var y = 0;
    for (var i = 0; i < vNum; i++) {
        var x_ = (width / 2) + sin(x) * distance;
        var y_ = (height / 2) + cos(y) * distance;
        var newVehicle = new vehicle_1.Vehicle(x_, y_);
        vehicles.push(newVehicle);
        x += TWO_PI / vNum;
        y += TWO_PI / vNum;
    }
};
window.draw = function () {
    background(120);
    circle(ball.x, ball.y, 20);
    var newX = width / 2 + (sin(frameCount / 40) * distance);
    var newY = height / 2 + (cos(frameCount / 40) * distance);
    ball.set(newX, newY);
    vehicles.forEach(function (v) {
        var flee = v.flee(ball);
        flee.mult(5);
        v.applyForce(flee);
        v.behaviors();
        v.update();
        v.show();
    });
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Daniel Shiffman
// http://codingtra.in
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
var Vehicle = /** @class */ (function () {
    function Vehicle(x, y, r) {
        if (r === void 0) { r = 8; }
        this.r = r;
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.maxSpeed = 10;
        this.maxForce = 1;
    }
    Vehicle.prototype.behaviors = function () {
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY);
        // var flee = this.flee(mouse);
        arrive.mult(1);
        // flee.mult(5);
        this.applyForce(arrive);
        // this.applyForce(flee);
    };
    Vehicle.prototype.applyForce = function (f) {
        this.acc.add(f);
    };
    Vehicle.prototype.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    };
    Vehicle.prototype.show = function () {
        stroke(255);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
    };
    Vehicle.prototype.arrive = function (target) {
        var desired = target.copy().sub(this.pos);
        var d = desired.mag();
        var speed = this.maxSpeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        var steer = desired.copy().sub(this.vel);
        steer.limit(this.maxForce);
        return steer;
    };
    Vehicle.prototype.flee = function (target) {
        var desired = target.copy().sub(this.pos);
        var d = desired.mag();
        if (d < 50) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = desired.copy().sub(this.vel);
            steer.limit(this.maxForce);
            return steer;
        }
        else {
            return createVector(0, 0);
        }
    };
    Vehicle.prototype.clone = function () {
        var v = new Vehicle(this.pos.x, this.pos.y);
        v.pos.x = this.pos.x;
        v.pos.y = this.pos.y;
        v.vel.x = this.vel.x;
        v.vel.y = this.vel.y;
        v.acc.x = this.acc.x;
        v.acc.y = this.acc.y;
        return v;
    };
    return Vehicle;
}());
exports.Vehicle = Vehicle;


/***/ })
/******/ ]);