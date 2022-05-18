/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enemy = exports.enemyRadius = void 0;
var linear_1 = __webpack_require__(2);
var sinus_1 = __webpack_require__(5);
exports.enemyRadius = 12.5;
var Enemy = /** @class */ (function () {
    function Enemy() {
        this.path = new (random([linear_1.LinearPath, sinus_1.SinusPath]))();
        this.x = 0;
        this.y = this.path.calculate(this.x);
        this.offset = frameCount / 3;
        Enemy.enemies.push(this);
    }
    Enemy.prototype.draw = function () {
        push();
        noFill();
        colorMode(HSB, 100);
        stroke(this.offset % 100, 100, 80);
        this.y = this.path.calculate(this.x);
        translate(this.x, height - this.y);
        rotate(-this.path.getAngle(this.x));
        circle(0, 0, exports.enemyRadius * 2);
        pop();
        this.x += 3;
        if (this.x > width)
            Enemy.removeSelf(this);
    };
    Enemy.prototype.colide = function () {
        console.log('Dead');
        Enemy.removeSelf(this);
    };
    Enemy.removeSelf = function (t) {
        var index = Enemy.enemies.indexOf(t);
        Enemy.enemies.splice(index, 1);
    };
    Enemy.enemies = [];
    Enemy.forEach = function (fn) { return Enemy.enemies.forEach(fn); };
    return Enemy;
}());
exports.Enemy = Enemy;


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinearPath = void 0;
var generic_1 = __webpack_require__(3);
var LinearPath = /** @class */ (function (_super) {
    __extends(LinearPath, _super);
    function LinearPath() {
        var _this = _super.call(this) || this;
        var x1 = 0;
        var x2 = width;
        var randomY1 = random(0, height);
        var randomY2 = random(0, height);
        _this.a = (randomY1 - randomY2) / (x1 - x2);
        _this.b = randomY1;
        return _this;
    }
    LinearPath.prototype.calculate = function (x) {
        return (this.a * x) + this.b;
    };
    return LinearPath;
}(generic_1.GenericPath));
exports.LinearPath = LinearPath;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenericPath = void 0;
var GenericPath = /** @class */ (function () {
    function GenericPath() {
    }
    GenericPath.prototype.getAngle = function (x) {
        return atan(2 / (this.calculate(x - 1) - this.calculate(x + 1))) + 90;
    };
    return GenericPath;
}());
exports.GenericPath = GenericPath;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = exports.playerRadius = void 0;
var enemy_1 = __webpack_require__(1);
var speedLimit = 10;
exports.playerRadius = 10;
var Player = /** @class */ (function () {
    function Player(x) {
        this.x = x;
        this.y = 0;
        // Physics stuff
        this.acc = 0;
        this.vel = 0;
    }
    Player.prototype.draw = function () {
        push();
        noStroke();
        fill(0);
        circle(this.x, this.y, exports.playerRadius * 2);
        pop();
        this.y += this.vel;
        this.vel = Math.min(this.vel + this.acc, speedLimit);
        this.vel *= 0.95;
        this.acc = 0;
        this.checkBounds();
    };
    Player.prototype.applyForce = function (f) {
        this.acc += f;
    };
    Player.prototype.checkBounds = function () {
        if (this.y < exports.playerRadius) {
            this.vel *= -1;
            this.y = exports.playerRadius;
        }
        if (this.y > height - exports.playerRadius) {
            this.vel *= -0.7;
            this.y = height - exports.playerRadius;
        }
    };
    Player.prototype.checkCollision = function (enemies) {
        var minDistSq = sq(exports.playerRadius + enemy_1.enemyRadius);
        for (var _i = 0, enemies_1 = enemies; _i < enemies_1.length; _i++) {
            var enemy = enemies_1[_i];
            // line(this.x, this.y, enemy.x, height - enemy.y); // Debug
            var distToEnemySq = sq(this.x - enemy.x) + sq(this.y - (height - enemy.y));
            if (distToEnemySq < minDistSq)
                enemy.colide();
        }
    };
    return Player;
}());
exports.Player = Player;


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SinusPath = void 0;
var generic_1 = __webpack_require__(3);
// Dead zone at top or bottom of the screen, in pixels
var topBottomMargin = 50;
var SinusPath = /** @class */ (function (_super) {
    __extends(SinusPath, _super);
    function SinusPath() {
        var _this = _super.call(this) || this;
        // Get random d, this is the starting point
        _this.d = random(topBottomMargin, height - topBottomMargin);
        var maxAmplitude = Math.min(_this.d, height - _this.d);
        _this.a = random(-maxAmplitude, maxAmplitude);
        _this.b = random(-2, 2);
        return _this;
    }
    SinusPath.prototype.calculate = function (x) {
        return this.a * sin(this.b * x) + this.d;
    };
    return SinusPath;
}(generic_1.GenericPath));
exports.SinusPath = SinusPath;


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

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
var enemy_1 = __webpack_require__(1);
var player_1 = __webpack_require__(4);
var playerX = window.innerWidth - 50;
var player = new player_1.Player(playerX);
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    angleMode(DEGREES);
    new enemy_1.Enemy();
    setInterval(function () { return (focused && new enemy_1.Enemy()); }, 200);
};
window.draw = function () {
    background(255, 75);
    enemy_1.Enemy.forEach(function (cur) { return cur.draw(); });
    player.draw();
    player.applyForce(1); // Gravity
    stroke(0);
    line((playerX - player_1.playerRadius), 0, (playerX - player_1.playerRadius), height);
    // Find all enemies that are close enough to the player
    var enemiesToCheck = [];
    for (var idx = 0; idx < enemy_1.Enemy.enemies.length; idx++) {
        var enemy = enemy_1.Enemy.enemies[idx];
        // If the enemy isn't close enough to the player, break out of the loop
        // All the enemies have the same speed, so we can be sure all the enemies are in sequential order
        if (enemy.x + enemy_1.enemyRadius < (playerX - player_1.playerRadius))
            break;
        enemiesToCheck.push(enemy);
    }
    player.checkCollision(enemiesToCheck);
    noStroke();
    rect(0, 0, 150, 50);
    text('FPS: ' + frameRate().toFixed(2), 5, 15);
    text('Enemies: ' + enemy_1.Enemy.enemies.length, 5, 25);
};
// Key shit
document.addEventListener('keydown', function (event) { return keyPressed(event.key.toLowerCase()); });
function keyPressed(key) {
    if (key == " ") {
        player.applyForce(-20); // Jumpforce upwards
    }
}

})();

/******/ })()
;