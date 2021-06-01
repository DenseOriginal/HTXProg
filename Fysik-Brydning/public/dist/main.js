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
var waterSurface = 0;
var uppperBrydning = 1;
var lowerBrydning = 1.33;
var criticalVinkel = 0;
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    waterSurface = height / 2;
    angleMode(DEGREES);
    criticalVinkel = asin(uppperBrydning / lowerBrydning);
};
window.draw = function () {
    background(255);
    // Draw water surface line
    strokeWeight(1);
    stroke(0);
    line(0, waterSurface, width, waterSurface);
    // Draw water color
    noStroke();
    fill(50, 50, 255, 50);
    rect(0, waterSurface, width, height);
    // Calculate laser
    var straightVector = createVector(1, 0);
    var mouseVector = createVector(mouseX, mouseY);
    var angle = straightVector.angleBetween(mouseVector);
    var laserLength = waterSurface / sin(angle);
    var laserX = cos(angle) * laserLength;
    var laserY = sin(angle) * laserLength;
    var indfaldsVinkel = 180 - 90 - angle;
    var waterIntersectX = waterSurface / tan(angle);
    // Draw laser
    strokeWeight(3);
    stroke(255, 100, 100);
    line(0, 0, laserX, laserY);
    // Calculate new laser path
    var brydningVinkel = 90 - asin((sin(indfaldsVinkel) * uppperBrydning) / lowerBrydning);
    var newAngle = indfaldsVinkel > criticalVinkel ? -90 + indfaldsVinkel : brydningVinkel;
    var newLaserX = cos(newAngle) * width + waterIntersectX;
    var newLaserY = sin(newAngle) * width + waterSurface;
    // Draw new laser path
    strokeWeight(3);
    stroke(255, 100, 100);
    line(waterIntersectX, waterSurface, newLaserX, newLaserY);
    // Random debug
    noStroke();
    fill(0);
    strokeWeight(0);
    text("indfaldsVinkel: " + indfaldsVinkel.toFixed(2), 10, 200);
    text("criticalVinkel: " + criticalVinkel.toFixed(2), 10, 210);
    text("brydningVinkel: " + brydningVinkel.toFixed(2), 10, 220);
    text("angle: " + angle.toFixed(2), 10, 230);
};


/***/ })
/******/ ]);