/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BeregningsBoks = void 0;
var BeregningsBoks = /** @class */ (function () {
    function BeregningsBoks(pos, backgroundColor, name, inputs) {
        var _this = this;
        this.pos = pos;
        this.backgroundColor = backgroundColor;
        this.name = name;
        this.id = name;
        var template = "\n    <div\n      class=\"boks\"\n      id=\"" + this.id + "\"\n      style=\"background-color: " + backgroundColor + "; top: " + pos.y + "px; left: " + pos.x + "px\"\n    >\n      <p id=\"name\">" + name + "</p>\n      <form>\n        " + generateInputTemplate(inputs) + "\n        <button type=\"submit\">Beregn</button>\n      </form>\n      <p id=\"output\"> </p>\n    </div>\n    ";
        var target = document.getElementById('target');
        if (!target)
            throw new Error('Can\'t find target node');
        target.innerHTML += template;
        // The elements are not yet in the DOM, so we need to get them again
        setTimeout(function () {
            var outputNode = document.querySelector("#" + _this.id + " > p#output");
            if (!outputNode)
                throw new Error('Can\'t find output node');
            _this.outputEl = outputNode;
            // Set the event listener
            var form = document.querySelector("#" + _this.id + " > form");
            if (!form)
                throw new Error('Can\'t find form');
            console.log(form);
            form.addEventListener('submit', _this.onSubmit.bind(_this));
        }, 10);
    }
    BeregningsBoks.prototype.onSubmit = function (e) {
        e.preventDefault();
        console.log(e);
        var inputs = document.querySelectorAll("#" + this.id + " > form > input");
        var sum = 0;
        inputs.forEach(function (inp) { return sum += Number(inp.value); });
        var average = (sum / inputs.length);
        this.outputEl.innerHTML = "= " + average.toFixed(2);
    };
    return BeregningsBoks;
}());
exports.BeregningsBoks = BeregningsBoks;
function generateInputTemplate(n) {
    var inputs = [];
    for (var i = 0; i < n; i++) {
        inputs.push('<input type="number">');
    }
    return inputs.join('');
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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

Object.defineProperty(exports, "__esModule", ({ value: true }));
var beregnings_boks_1 = __webpack_require__(1);
new beregnings_boks_1.BeregningsBoks({ x: 100, y: 30 }, 'red', 'Hello', 3);
new beregnings_boks_1.BeregningsBoks({ x: 300, y: 30 }, 'yellow', 'world', 5);
new beregnings_boks_1.BeregningsBoks({ x: 500, y: 30 }, 'rgb(231, 32, 231)', 'test', 10);
new beregnings_boks_1.BeregningsBoks({ x: 700, y: 30 }, 'rgb(76, 164, 174)', 'mange', 200);

})();

/******/ })()
;