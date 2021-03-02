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
var container_1 = __webpack_require__(1);
var gas_1 = __webpack_require__(3);
var container;
var slider;
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    container = new container_1.Container(.05, .15, new gas_1.Gas({
        pressure: 101325,
        temperature: 323.15,
        molarMass: 0.0291 // kg / mol
    }));
    slider = createSlider(-273, 500);
};
window.draw = function () {
    background(255);
    container.display();
    container.update();
    line(0, 600, width, 600);
    container.gas.temperature = Number(slider.value()) + 273.15;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var settings_1 = __webpack_require__(2);
var Container = /** @class */ (function () {
    function Container(mass, volume, gas) {
        this.mass = mass;
        this.volume = volume;
        this.gas = gas;
        this.position = createVector(width / 2, height / 2);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
    }
    Container.prototype.applyForce = function (f) {
        this.acceleration.add(f);
    };
    Container.prototype.update = function () {
        // M * g
        var fT = (this.mass + (this.gas.density * this.volume)) * settings_1.settings.tyngdeAcceleration;
        var fTTransformed = 1;
        // V_genstand * Rho_atm * g
        var fOpDensity = this.position.y > 600 ? settings_1.settings.lowerGas.density : settings_1.settings.atmGas.density;
        var fOp = this.volume * fOpDensity * settings_1.settings.tyngdeAcceleration;
        var fOpTransformed = -(1 / fT * fOp);
        text(JSON.stringify({
            fT: fT,
            fOp: fOp,
            temp: this.gas.temperature
        }, undefined, 2), 10, 10);
        var fTVector = createVector(0, fTTransformed);
        var fOpVector = createVector(0, fOpTransformed);
        push();
        strokeWeight(2);
        stroke(255, 175, 175);
        drawArrow(this.position, fTVector.copy().mult(40), 7);
        stroke(175, 255, 175);
        drawArrow(this.position, fOpVector.copy().mult(40), 7);
        pop();
        this.applyForce(fTVector);
        this.applyForce(fOpVector);
        this.velocity.add(this.acceleration);
        this.velocity.mult(.95);
        this.acceleration.mult(0);
        this.position.add(this.velocity);
        this.checkEdges();
    };
    Container.prototype.display = function () {
        circle(this.position.x, this.position.y, 30);
    };
    Container.prototype.checkEdges = function () {
        if (this.position.y > height) {
            this.velocity.y *= -.2;
            this.position.y = height;
        }
        ;
        if (this.position.y < 0) {
            this.velocity.y *= -.2;
            this.position.y = 0;
        }
        ;
    };
    return Container;
}());
exports.Container = Container;
function drawArrow(base, vec, s) {
    push();
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    var arrowSize = s;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
var gas_1 = __webpack_require__(3);
var Settings = /** @class */ (function () {
    function Settings() {
        this.atmGas = new gas_1.Gas({
            pressure: 101325,
            temperature: 293.15,
            molarMass: 0.0291 // kg / mol
        });
        this.lowerGas = new gas_1.Gas({
            pressure: 101325,
            temperature: 293.15,
            molarMass: 0.2 // kg / mol
        });
        this.tyngdeAcceleration = 9.82;
    }
    return Settings;
}());
exports.settings = new Settings;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Gas = void 0;
var Gas = /** @class */ (function () {
    function Gas(options) {
        this.pressure = options.pressure;
        this.temperature = options.temperature;
        this.molarMass = options.molarMass;
    }
    Object.defineProperty(Gas.prototype, "density", {
        get: function () {
            return (this.molarMass / 8.31) * (this.pressure / this.temperature);
        },
        enumerable: false,
        configurable: true
    });
    return Gas;
}());
exports.Gas = Gas;


/***/ })
/******/ ]);