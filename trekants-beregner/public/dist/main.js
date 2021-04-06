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

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var formler_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(2);
var inputs = __spreadArrays(document.getElementsByClassName('inp')).reduce(function (acc, cur) {
    var id = cur.id;
    acc[id] = cur;
    return acc;
}, {});
(_a = document.getElementById('submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', udregn);
function udregn() {
    var knownValues = [];
    var values = Object.entries(inputs).reduce(function (acc, cur) {
        var _a = cur, key = _a[0], elm = _a[1];
        var value = elm.value;
        if (value)
            knownValues.push(key);
        acc[key] = value ? Number(value) : undefined;
        return acc;
    }, {});
    var formulas = formler_1.formler
        .filter(function (f) { return !knownValues.includes(f.returns); })
        .filter(function (f) { return helpers_1.hasKnownBits(knownValues, f.requires); });
    if (formulas.length < 1) {
        console.log('Not enough values');
        return;
    }
    formulas
        .forEach(function (f) { return console.log("Calculating " + f.returns + ", result is: " + f.calculate(values)); });
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formler = void 0;
var helpers_1 = __webpack_require__(2);
exports.formler = [
    helpers_1.linjeStykkeFactory('A', 'b', 'c', 'a'),
    helpers_1.linjeStykkeFactory('B', 'a', 'c', 'b'),
    helpers_1.linjeStykkeFactory('C', 'a', 'b', 'c'),
    helpers_1.vinkelFormelFactory('a', 'b', 'c', 'A'),
    helpers_1.vinkelFormelFactory('b', 'c', 'a', 'B'),
    helpers_1.vinkelFormelFactory('c', 'a', 'b', 'C'),
    helpers_1.twoVinklerFactory('A', 'B', 'C'),
    helpers_1.twoVinklerFactory('C', 'A', 'B'),
    helpers_1.twoVinklerFactory('B', 'C', 'A')
];


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.twoVinklerFactory = exports.vinkelFormelFactory = exports.linjeStykkeFactory = exports.toRadians = exports.toDegrees = exports.sin = exports.cos = exports.acos = exports.hasKnownBits = void 0;
function hasKnownBits(known, needed) {
    var knownArr = Object.values(known);
    return Object.values(needed).every(function (bit) { return knownArr.includes(bit); });
}
exports.hasKnownBits = hasKnownBits;
function acos(inp) {
    return toDegrees(Math.acos(inp));
}
exports.acos = acos;
function cos(angle) {
    return Math.cos(toRadians(angle));
}
exports.cos = cos;
function sin(angle) {
    return Math.sin(toRadians(angle));
}
exports.sin = sin;
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
exports.toDegrees = toDegrees;
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
exports.toRadians = toRadians;
function linjeStykkeFactory(vinkel, aLinje, bLinje, returns) {
    var calculateFunc = function (inputs) {
        var vinkelVal = inputs[vinkel];
        var bVal = inputs[aLinje];
        var cVal = inputs[bLinje];
        return Math.sqrt(Math.pow(bVal, 2) + Math.pow(cVal, 2) - 2 * bVal * cVal * cos(vinkelVal));
    };
    return {
        requires: [vinkel, aLinje, bLinje],
        returns: returns,
        calculate: calculateFunc
    };
}
exports.linjeStykkeFactory = linjeStykkeFactory;
function vinkelFormelFactory(aLinje, bLinje, cLinje, returns) {
    var calculateFunc = function (inputs) {
        var a = inputs[aLinje];
        var b = inputs[bLinje];
        var c = inputs[cLinje];
        return acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c));
    };
    return {
        requires: [aLinje, bLinje, cLinje],
        returns: returns,
        calculate: calculateFunc
    };
}
exports.vinkelFormelFactory = vinkelFormelFactory;
function twoVinklerFactory(aVinkel, bVinkel, returns) {
    var calculateFunc = function (inputs) {
        var A = inputs[aVinkel];
        var B = inputs[bVinkel];
        return 180 - A - B;
    };
    return {
        requires: [aVinkel, bVinkel],
        returns: returns,
        calculate: calculateFunc
    };
}
exports.twoVinklerFactory = twoVinklerFactory;


/***/ })
/******/ ]);