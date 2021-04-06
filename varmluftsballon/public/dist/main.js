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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/container.ts":
/*!**********************************!*\
  !*** ./src/classes/container.ts ***!
  \**********************************/
/*! exports provided: Container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Container\", function() { return Container; });\n/* harmony import */ var _helpers_temperature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/temperature */ \"./src/helpers/temperature.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings */ \"./src/settings.ts\");\n/* harmony import */ var _gas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gas */ \"./src/classes/gas.ts\");\n/* harmony import */ var _physics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physics */ \"./src/classes/physics.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\n\r\n\r\n\r\n\r\nvar defaultContainer = {\r\n    temperature: Object(_helpers_temperature__WEBPACK_IMPORTED_MODULE_0__[\"toKelvin\"])(20),\r\n    pressure: _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].atmosphericPressure,\r\n    width: 10,\r\n    height: 10,\r\n    depth: 1\r\n};\r\nvar Container = /** @class */ (function (_super) {\r\n    __extends(Container, _super);\r\n    function Container(Options) {\r\n        var _this = _super.call(this) || this;\r\n        var optionsToUse = Object.assign(defaultContainer, Options);\r\n        _this.width = optionsToUse.width;\r\n        _this.height = optionsToUse.height;\r\n        _this.depth = optionsToUse.depth;\r\n        _this.volume = optionsToUse.volume ? optionsToUse.volume : _this.width * _this.height * _this.depth;\r\n        var gas = new _gas__WEBPACK_IMPORTED_MODULE_2__[\"Gas\"](__assign({ temperature: optionsToUse.temperature, pressure: optionsToUse.pressure, volume: _this.volume }, optionsToUse.gasPreset));\r\n        _this.gas = gas;\r\n        return _this;\r\n    }\r\n    Container.prototype.update = function () {\r\n        var gravityVector = createVector(0, _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].gravityConstant * this.mass);\r\n        this.applyForce(gravityVector);\r\n        var fOp = _settings__WEBPACK_IMPORTED_MODULE_1__[\"atmosphericGas\"].density * this.volume * _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].gravityConstant;\r\n        this.applyForce(createVector(0, -fOp));\r\n        var fDrag = .05 * ((_settings__WEBPACK_IMPORTED_MODULE_1__[\"atmosphericGas\"].density * this.velocity.magSq()) / 2 * this.width);\r\n        this.applyForce(this.velocity.copy().normalize().mult(-1).mult(fDrag));\r\n        console.log(this.velocity, -fDrag);\r\n        this.updatePhysics();\r\n        this.checkEdges();\r\n    };\r\n    Container.prototype.display = function () {\r\n        text(JSON.stringify({\r\n            fT: _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].gravityConstant * this.mass,\r\n            fOp: _settings__WEBPACK_IMPORTED_MODULE_1__[\"atmosphericGas\"].density * this.volume * _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].gravityConstant,\r\n            volume: this.volume,\r\n            mass: this.mass,\r\n            gasDensity: this.gas.density,\r\n            gasTemp: this.gas.temperature,\r\n            gasPressure: this.gas.pressure,\r\n            gasConstant: _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].gasConstant,\r\n            gasMolarMass: this.gas.molarMass,\r\n            \"\": \"\",\r\n            airDensity: _settings__WEBPACK_IMPORTED_MODULE_1__[\"atmosphericGas\"].density,\r\n            airTemp: _settings__WEBPACK_IMPORTED_MODULE_1__[\"atmosphericGas\"].temperature,\r\n            airPressure: _settings__WEBPACK_IMPORTED_MODULE_1__[\"atmosphericGas\"].pressure,\r\n            airMolarMass: _settings__WEBPACK_IMPORTED_MODULE_1__[\"atmosphericGas\"].molarMass\r\n        }, undefined, 2), 10, 10);\r\n        push();\r\n        rectMode(CENTER);\r\n        translate(this.position.x, this.position.y);\r\n        var _a = this.gas.color, r = _a.r, g = _a.g, b = _a.b, alpha = _a.alpha;\r\n        fill(r, g, b, alpha);\r\n        strokeWeight(2);\r\n        stroke(0);\r\n        rect(0, 0, this.width, this.height);\r\n        pop();\r\n    };\r\n    Object.defineProperty(Container.prototype, \"mass\", {\r\n        get: function () {\r\n            return this.gas.density * this.gas.volume;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    return Container;\r\n}(_physics__WEBPACK_IMPORTED_MODULE_3__[\"PhysicsObject\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./src/classes/container.ts?");

/***/ }),

/***/ "./src/classes/gas.ts":
/*!****************************!*\
  !*** ./src/classes/gas.ts ***!
  \****************************/
/*! exports provided: Gas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Gas\", function() { return Gas; });\n/* harmony import */ var _helpers_temperature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/temperature */ \"./src/helpers/temperature.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings */ \"./src/settings.ts\");\n\r\n\r\nvar defaultGas = {\r\n    temperature: Object(_helpers_temperature__WEBPACK_IMPORTED_MODULE_0__[\"toKelvin\"])(20),\r\n    pressure: 101325,\r\n    volume: 10,\r\n    molarMass: 0.0291,\r\n    color: { r: 255, g: 255, b: 255 }\r\n};\r\nvar Gas = /** @class */ (function () {\r\n    function Gas(Options) {\r\n        var optionsToUse = Object.assign(defaultGas, Options);\r\n        this.pressure = optionsToUse.pressure;\r\n        this.volume = optionsToUse.volume;\r\n        this.molarMass = optionsToUse.molarMass;\r\n        this.temperature = optionsToUse.temperature;\r\n        this.color = optionsToUse.color;\r\n    }\r\n    Object.defineProperty(Gas.prototype, \"density\", {\r\n        get: function () {\r\n            return (this.molarMass / _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].gasConstant) * (this.pressure / this.temperature);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    return Gas;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/classes/gas.ts?");

/***/ }),

/***/ "./src/classes/physics.ts":
/*!********************************!*\
  !*** ./src/classes/physics.ts ***!
  \********************************/
/*! exports provided: PhysicsObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PhysicsObject\", function() { return PhysicsObject; });\nvar PhysicsObject = /** @class */ (function () {\r\n    function PhysicsObject() {\r\n        this.position = createVector(0, 0);\r\n        this.velocity = createVector(0, 0);\r\n        this.acceleration = createVector(0, 0);\r\n    }\r\n    Object.defineProperty(PhysicsObject.prototype, \"mass\", {\r\n        get: function () {\r\n            return 10;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    ;\r\n    PhysicsObject.prototype.applyForce = function (f) {\r\n        var forceToApply = f.copy().div(10);\r\n        this.acceleration.add(forceToApply);\r\n    };\r\n    PhysicsObject.prototype.updatePhysics = function () {\r\n        // Velocity changes according to acceleration\r\n        this.velocity.add(this.acceleration);\r\n        // position changes by velocity\r\n        this.position.add(this.velocity);\r\n        // We must clear acceleration each frame\r\n        this.acceleration.mult(0);\r\n    };\r\n    PhysicsObject.prototype.checkEdges = function () {\r\n        // if(this.position.x < 0 || this.position.x > width) this.velocity.mult(-0.5);\r\n        // if(this.position.y < 0 || this.position.y > height) this.velocity.mult(-0.5);\r\n        if (this.position.x < 0)\r\n            this.position.x = 0;\r\n        if (this.position.x > width)\r\n            this.position.x = width;\r\n        if (this.position.y < 0)\r\n            this.position.y = 0;\r\n        if (this.position.y > height)\r\n            this.position.y = height;\r\n    };\r\n    return PhysicsObject;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/classes/physics.ts?");

/***/ }),

/***/ "./src/helpers/temperature.ts":
/*!************************************!*\
  !*** ./src/helpers/temperature.ts ***!
  \************************************/
/*! exports provided: toKelvin, toCelcius */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toKelvin\", function() { return toKelvin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toCelcius\", function() { return toCelcius; });\nfunction toKelvin(celsius) {\r\n    if (celsius < -273.15)\r\n        throw new Error('Celsius input is less than -273.15');\r\n    return celsius + 273.15;\r\n}\r\nfunction toCelcius(kelvin) {\r\n    if (kelvin < 0)\r\n        throw new Error('Kelvin input is less than 0');\r\n    return kelvin - 273.15;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/helpers/temperature.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/container */ \"./src/classes/container.ts\");\n/* harmony import */ var _helpers_temperature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/temperature */ \"./src/helpers/temperature.ts\");\n/// <reference path=\"../node_modules/@types/p5/global.d.ts\"/>\r\n\r\n\r\nvar container;\r\nwindow.setup = function () {\r\n    createCanvas(windowWidth, windowHeight);\r\n    rectMode(CENTER);\r\n    container = new _classes_container__WEBPACK_IMPORTED_MODULE_0__[\"Container\"]({\r\n        width: 50,\r\n        height: 50,\r\n        volume: 1,\r\n        gasPreset: {\r\n            molarMass: 0.0291,\r\n            color: { r: 100, g: 100, b: 100, alpha: 100 }\r\n        },\r\n        temperature: Object(_helpers_temperature__WEBPACK_IMPORTED_MODULE_1__[\"toKelvin\"])(50)\r\n    });\r\n    container.position = createVector(width / 2, height);\r\n};\r\nwindow.draw = function () {\r\n    background(255);\r\n    container.update();\r\n    container.display();\r\n};\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/*! exports provided: Settings, atmosphericGas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Settings\", function() { return Settings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"atmosphericGas\", function() { return atmosphericGas; });\n/* harmony import */ var _classes_gas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/gas */ \"./src/classes/gas.ts\");\n/* harmony import */ var _helpers_temperature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/temperature */ \"./src/helpers/temperature.ts\");\n\r\n\r\nvar Settings = {\r\n    temperature: Object(_helpers_temperature__WEBPACK_IMPORTED_MODULE_1__[\"toKelvin\"])(20),\r\n    gasConstant: 8.31,\r\n    atmosphericPressure: 101325,\r\n    gravityConstant: 9.82\r\n};\r\nvar atmosphericGas = new _classes_gas__WEBPACK_IMPORTED_MODULE_0__[\"Gas\"]({ volume: 5e18 });\r\n\n\n//# sourceURL=webpack:///./src/settings.ts?");

/***/ })

/******/ });