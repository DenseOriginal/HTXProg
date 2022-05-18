/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/// <reference path="../node_modules/@types/p5/global.d.ts"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.player = void 0;
var enemy_1 = __webpack_require__(1);
var player_1 = __webpack_require__(6);
var playerX = window.innerWidth - 50;
exports.player = new player_1.Player(playerX);
var lastTimeEnemySpawned = 0;
var enemySpawnTimer = 1500;
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    angleMode(DEGREES);
    new enemy_1.Enemy();
};
window.draw = function () {
    background(255, 75);
    enemy_1.Enemy.forEach(function (cur) { return cur.draw(); });
    exports.player.draw();
    exports.player.applyForce(1); // Gravity
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
    exports.player.checkCollision(enemiesToCheck);
    if (millis() - lastTimeEnemySpawned > enemySpawnTimer) {
        lastTimeEnemySpawned = millis();
        new enemy_1.Enemy();
    }
    enemySpawnTimer = 800 * Math.pow(0.996, (millis() / 1000)) + 200;
    // UI stuff
    noStroke();
    fill(255);
    rect(0, 0, 200, 50);
    fill(0);
    text('Spawn time: ' + enemySpawnTimer.toFixed(1), 5, 10);
};
// Key shit
document.addEventListener('keydown', function (event) { return keyPressed(event.key.toLowerCase()); });
function keyPressed(key) {
    if (key == " ") {
        exports.player.applyForce(-20); // Jumpforce upwards
    }
}


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enemy = exports.enemyRadius = void 0;
var main_1 = __webpack_require__(0);
var exponential_1 = __webpack_require__(2);
var linear_1 = __webpack_require__(4);
var sinus_1 = __webpack_require__(5);
exports.enemyRadius = 12.5;
var Enemy = /** @class */ (function () {
    function Enemy() {
        this.path = new (random([linear_1.LinearPath, sinus_1.SinusPath, exponential_1.ExponentialPath]))();
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
        if (this.x > width) {
            main_1.player.score += 100;
            Enemy.removeSelf(this);
        }
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
exports.ExponentialPath = void 0;
var main_1 = __webpack_require__(0);
var generic_1 = __webpack_require__(3);
var ExponentialPath = /** @class */ (function (_super) {
    __extends(ExponentialPath, _super);
    function ExponentialPath() {
        var _this = _super.call(this) || this;
        var x1 = 0;
        var x2 = main_1.player.x;
        var y1 = random(0, height);
        var y2 = height - main_1.player.y;
        _this.a = pow((y2 / y1), 1 / (x2 - x1));
        _this.b = (y2) / (pow(_this.a, x2));
        return _this;
    }
    ExponentialPath.prototype.calculate = function (x) {
        return this.b * pow(this.a, x);
    };
    return ExponentialPath;
}(generic_1.GenericPath));
exports.ExponentialPath = ExponentialPath;


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


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = exports.playerRadius = void 0;
var enemy_1 = __webpack_require__(1);
var speedLimit = 10;
exports.playerRadius = 10;
var healtBarPadding = 10;
var healthBarSize = 20;
var Player = /** @class */ (function () {
    function Player(x) {
        this.x = x;
        this.y = 0;
        this.health = 100;
        // Physics stuff
        this.acc = 0;
        this.vel = 0;
        this.dead = false;
        this.score = 0;
    }
    Player.prototype.draw = function () {
        push();
        noStroke();
        fill(0);
        circle(this.x, this.y, exports.playerRadius * 2);
        // Healthbar
        rectMode(CORNER);
        fill(0, 2);
        rect(healtBarPadding, height - healtBarPadding - healthBarSize, width - (healtBarPadding * 2), healthBarSize);
        fill(255, 100, 100);
        rect(healtBarPadding, height - healtBarPadding - healthBarSize, (width - (healtBarPadding * 2)) * (this.health / 100), healthBarSize);
        pop();
        // Regenerate
        if (this.health < 100 && this.health > 0)
            this.health = min(100, this.health + 0.008);
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
        var _a;
        var minDistSq = sq(exports.playerRadius + enemy_1.enemyRadius);
        for (var _i = 0, enemies_1 = enemies; _i < enemies_1.length; _i++) {
            var enemy = enemies_1[_i];
            // line(this.x, this.y, enemy.x, height - enemy.y); // Debug
            var distToEnemySq = sq(this.x - enemy.x) + sq(this.y - (height - enemy.y));
            if (distToEnemySq < minDistSq) {
                enemy.colide();
                var shakeElement = document.body;
                shakeElement === null || shakeElement === void 0 ? void 0 : shakeElement.classList.remove('shake');
                void (shakeElement === null || shakeElement === void 0 ? void 0 : shakeElement.offsetWidth); // Funky trick to allow the screen shake
                shakeElement === null || shakeElement === void 0 ? void 0 : shakeElement.classList.add('shake');
                this.health -= 20;
                if (this.health < 0) {
                    this.health = 0;
                    (_a = document.getElementById('game-over')) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
                    document.getElementById('score').innerText = this.score;
                    this.dead = true;
                    noCanvas();
                    noLoop();
                }
            }
        }
    };
    return Player;
}());
exports.Player = Player;


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;