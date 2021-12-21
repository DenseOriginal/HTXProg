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
var pos;
var vec;
var acc;
var mass = 5;
var radius = 10;
var pixelsPerM;
var screenLengthInMeters = 100; // m
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    pos = createVector(0, height);
    vec = createVector(0, 0);
    acc = createVector(0, 0);
    pixelsPerM = width / screenLengthInMeters;
    applyForce(createVector(200, -500));
};
window.draw = function () {
    background(255);
    fill(0);
    circle(pos.x, pos.y, radius);
    pos.add(vectorToPixels(vec));
    vec.add(acc);
    vec.mult(0.995);
    acc.mult(0);
    checkBounds();
    applyForce(createVector(0, 9.82));
};
// Input vector is expected to be in meters
function applyForce(f) {
    var forceToAdd = f.copy().div(mass).div(60);
    acc.add(forceToAdd);
}
function keyPressed(key) {
    if (key == " ") {
        applyForce(createVector(0, -50));
        console.log(acc);
    }
}
// If the ball moves off the screen
// Loop it back around
function checkBounds() {
    if (pos.x > width)
        pos.x = 0;
    if (pos.x < 0)
        pos.x = width;
    if (pos.y > height) {
        vec.y = 0;
        pos.y = height;
    }
}
function metersToPixels(meters) {
    return meters * pixelsPerM;
}
function vectorToPixels(f) {
    return f.copy().mult(pixelsPerM);
}
// Key shit
document.addEventListener('keydown', function (event) { return keyPressed(event.key.toLowerCase()); });


/***/ })
/******/ ]);