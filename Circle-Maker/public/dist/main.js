/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports) {


/// <reference path="../node_modules/@types/p5/global.d.ts"/>
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.advanced_click = exports.advanced_draw = exports.advanced_setup = void 0;
var userPoints = [{ x: 40, y: 60 }, { x: 20, y: 20 }, { x: 60, y: 0 }];
exports.advanced_setup = function () {
    createCanvas(windowWidth, windowHeight);
    noLoop();
};
exports.advanced_draw = function () {
    var e_1, _a;
    background(0);
    var _b = __read(udregnKomponenter(userPoints.reduce(function (acc, cur) { return __spread(acc, [cur.x, cur.y]); }, [])), 3), a = _b[0], b = _b[1], r = _b[2];
    // Arrays til top og bund punkterne, dette er så at vi kan lave en fin cirkel bagefter
    // Istede for en masse punkter
    var top = [];
    var bottom = [];
    // Vi behøver ikke at loope over hele canvassas
    // Fordi vi ved at en cirkel ikke er større end dens diameter
    for (var x = 0; x < width; x += 1) {
        var y1 = b + (-0.5 * Math.pow(((-4 * Math.pow(x, 2)) + 8 * a * x + 4 * Math.pow(r, 2) - 4 * Math.pow(a, 2)), 0.5));
        top.push({ x: x, y: y1 }); // Tilføj punktet til listen
        var y2 = b + 0.5 * Math.pow(((-4 * Math.pow(x, 2)) + 8 * a * x + 4 * Math.pow(r, 2) - 4 * Math.pow(a, 2)), 0.5);
        bottom.push({ x: x, y: y2 }); // Tilføj punktet til listen
    }
    // Loop over alle punkterne i cirklen, hvor vi starter med den øverste halvdel af punkter
    // Og bagefter den nederste halvden af punkter, men i omvendt rækkefølge
    // Fordi ellers for man en streg lige over midten af cirklen
    beginShape();
    try {
        for (var _c = __values(__spread(top, (bottom.reverse()))), _d = _c.next(); !_d.done; _d = _c.next()) {
            var p = _d.value;
            vertex(p.x, p.y);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    endShape('close');
    push();
    strokeWeight(2);
    noFill();
    stroke(255, 100, 100);
    userPoints.forEach(function (p) { return circle(p.x, p.y, 5); });
    pop();
    noLoop();
};
function udregnKomponenter(points) {
    var _a = __read(points, 6), x = _a[0], y = _a[1], x_1 = _a[2], y_1 = _a[3], x_2 = _a[4], y_2 = _a[5];
    var a = ((-(y_1 - y) * Math.pow(y_2, (2))) - ((-1 * Math.pow((-y_1), (2))) + Math.pow(y, (2)) - Math.pow(x_1, (2)) + Math.pow(x, (2))) * y_2 - y * Math.pow(y_1, (2)) - ((-1 * Math.pow((-y), (2))) + Math.pow(x_2, (2)) - Math.pow(x, (2))) * y_1 - (Math.pow(x_1, (2)) - Math.pow(x_2, (2))) * y) / ((2 * x_1 - 2 * x) * y_2 + (2 * x - 2 * x_2) * y_1 + (2 * x_2 - 2 * x_1) * y);
    var b = ((x_1 - x) * Math.pow(y_2, 2) +
        (x - x_2) * Math.pow(y_1, 2) +
        (x_2 - x_1) * Math.pow(y, 2) +
        (x_1 - x) * Math.pow(x_2, 2) +
        (Math.pow(x, 2) - Math.pow(x_1, 2)) * x_2 +
        x * Math.pow(x_1, 2) -
        Math.pow(x, 2) * x_1) /
        ((2 * x_1 - 2 * x) * y_2 +
            (2 * x - 2 * x_2) * y_1 +
            (2 * x_2 - 2 * x_1) * y);
    var r = sqrt(Math.pow((x - a), 2) + Math.pow((y - b), 2));
    return [a, b, r];
}
var counter = 0;
exports.advanced_click = function () {
    userPoints[counter++ % 3] = { x: mouseX, y: mouseY };
    exports.advanced_draw();
};


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports) {


/// <reference path="../node_modules/@types/p5/global.d.ts"/>
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.basic_draw = exports.basic_setup = void 0;
exports.basic_setup = function () {
    createCanvas(windowWidth, windowHeight);
};
exports.basic_draw = function () {
    background(0);
    stroke('white');
    strokeWeight(2);
    minCirkel(200, 250, 50, 0.01);
    noLoop();
};
function minCirkel(cX, cY, r, resolution) {
    var e_1, _a;
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
        bottom.push({ x: x, y: y2 }); // Tilføj punktet til listen
    }
    // Loop over alle punkterne i cirklen, hvor vi starter med den øverste halvdel af punkter
    // Og bagefter den nederste halvden af punkter, men i omvendt rækkefølge
    // Fordi ellers for man en streg lige over midten af cirklen
    beginShape();
    try {
        for (var _b = __values(__spread(top, (bottom.reverse()))), _c = _b.next(); !_c.done; _c = _b.next()) {
            var p = _c.value;
            vertex(p.x, p.y);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    endShape();
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

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
/// <reference path="../node_modules/@types/p5/global.d.ts"/>
var advanced_1 = __webpack_require__(1);
var basic_1 = __webpack_require__(2);
var state = 'basic';
window.setup = function () {
    state == 'basic' ? basic_1.basic_setup() : advanced_1.advanced_setup();
};
window.draw = function () {
    state == 'basic' ? basic_1.basic_draw() : advanced_1.advanced_draw();
};
window.mousePressed = function () {
    state == 'basic' ? {} : advanced_1.advanced_click();
};
(_a = document.getElementById('switch')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    state = state == 'basic' ? 'advanced' : 'basic';
    loop();
});

})();

/******/ })()
;