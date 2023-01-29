/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function() {


/// <reference path="../node_modules/@types/p5/global.d.ts"/>
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var derivative = function (f, h) {
    if (h === void 0) { h = 1e-5; }
    return function (x) { return (f(x + h) - f(x)) / h; };
};
function newtonsMethod(f, x0) {
    var x, iterations, fPrime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                x = x0;
                iterations = 0;
                fPrime = derivative(f);
                _a.label = 1;
            case 1:
                if (!(Math.abs(f(x)) > 1e-5)) return [3 /*break*/, 3];
                iterations++;
                return [4 /*yield*/, { root: x, iterations: iterations }];
            case 2:
                _a.sent();
                x = x - f(x) / fPrime(x);
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, { root: x, iterations: iterations }];
        }
    });
}
var animationOverFrames = 30;
var zoomScale = 100;
var f = function (x) { return Math.cos(x) - Math.pow(x, 3); };
var x0 = 0.5;
var rootFinder = newtonsMethod(f, x0);
var prevRoot = x0;
var nextRoot = rootFinder.next();
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
};
window.draw = function () {
    background(255);
    // Draw the x-axis and y-axis
    strokeWeight(1);
    stroke(150);
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
    translate(width / 2, height / 2);
    // Draw the function
    strokeWeight(2);
    stroke(0);
    fill(0, 0, 0, 0);
    beginShape();
    for (var x = -10; x < 10; x += 0.01) {
        vertex(x * zoomScale, -f(x) * zoomScale);
    }
    endShape();
    if (frameCount % animationOverFrames == 0 && !nextRoot.done) {
        prevRoot = nextRoot.value.root;
        nextRoot = rootFinder.next();
    }
    var _a = nextRoot.value, root = _a.root, iterations = _a.iterations;
    var lerpedRoot = lerp(prevRoot, root, (frameCount % animationOverFrames) / animationOverFrames);
    // Draw the root on the graph
    strokeWeight(4);
    // stroke(0, 0, 255);
    // fill(0, 0, 255);
    // circle(root * zoomScale, -f(root) * zoomScale, 5);
    stroke(255, 0, 0);
    fill(255, 0, 0);
    circle((lerpedRoot) * zoomScale, 0, 3);
    // Print the root and number of iterations
    fill(0);
    noStroke();
    text("Root: " + root.toFixed(5), 20, 20);
    text("Iterations: " + iterations, 20, 40);
};


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