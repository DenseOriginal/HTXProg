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
var population_1 = __webpack_require__(1);
var cnvWidth = window.innerWidth;
var cnvHeight = window.innerHeight;
var target;
var pop;
window.setup = function () {
    createCanvas(cnvWidth, cnvHeight);
    target = createVector(cnvWidth / 2, 50);
    var spawn = createVector(cnvWidth / 2, cnvHeight - 50);
    pop = new population_1.Population(100, 300, target, spawn, 0.001);
    pop.generatePopulation();
};
window.draw = function () {
    background(240);
    fill(0);
    circle(target.x, target.y, 20);
    pop.run();
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Population = void 0;
var dna_1 = __webpack_require__(2);
var rocket_1 = __webpack_require__(3);
var Population = /** @class */ (function () {
    function Population(populationSize, stepsInGeneration, target, rocketSpawnPos, mutationRate) {
        this.populationSize = populationSize;
        this.stepsInGeneration = stepsInGeneration;
        this.target = target;
        this.rocketSpawnPos = rocketSpawnPos;
        this.mutationRate = mutationRate;
        this.population = [];
        this.matingPool = [];
        this.stepsTaken = 0;
        this.flightPattern = [];
    }
    Population.prototype.generatePopulation = function () {
        for (var i = 0; i < this.populationSize; i++) {
            var newRocket = new rocket_1.Rocket(this.stepsInGeneration, this.rocketSpawnPos);
            this.population.push(newRocket);
        }
    };
    Population.prototype.run = function () {
        var _this = this;
        if (this.stepsTaken >= this.stepsInGeneration) {
            this.evolve();
            return;
        }
        var sumPosition = createVector(0, 0);
        // Draw flight patter
        stroke(0);
        noFill();
        beginShape();
        this.flightPattern.forEach(function (pos) { return vertex(pos.x, pos.y); });
        endShape();
        // Rocket color
        fill(255);
        stroke(0);
        this.population.forEach(function (rocket) {
            rocket.doStep(_this.stepsTaken);
            rocket.update();
            rocket.checkTarget(_this.target);
            rocket.checkEdges();
            rocket.display();
            sumPosition.add(rocket.pos);
        });
        sumPosition.div(this.population.length);
        this.flightPattern.push(sumPosition);
        this.stepsTaken++;
    };
    Population.prototype.evolve = function () {
        this.calculateFitness();
        this.createMatingPool();
        this.reproduction();
        this.stepsTaken = 0;
        this.flightPattern = [];
    };
    Population.prototype.calculateFitness = function () {
        var _this = this;
        this.population.forEach(function (rocket) { return rocket.calculateFitness(_this.target); });
    };
    Population.prototype.createMatingPool = function () {
        var _this = this;
        this.matingPool = [];
        var maxFitness = this.getMaxFitness();
        var minFitness = this.getMinFitness();
        this.population.forEach(function (rocket) {
            var fitnessNormal = map(rocket.fitness, minFitness, maxFitness, 0, 1);
            // Amount of this perticulary rocket's genes in the mating pool
            var amountInMatingPool = fitnessNormal * 100;
            for (var i = 0; i < amountInMatingPool; i++) {
                _this.matingPool.push(rocket.genes);
            }
        });
    };
    Population.prototype.reproduction = function () {
        for (var i = 0; i < this.populationSize; i++) {
            var mom = random(this.matingPool);
            var dad = random(this.matingPool);
            var newDNA = new dna_1.DNA(this.stepsInGeneration);
            newDNA.generateFromParents([mom, dad]);
            newDNA.mutate(this.mutationRate);
            var newRocket = new rocket_1.Rocket(this.stepsInGeneration, this.rocketSpawnPos, newDNA);
            this.population[i] = newRocket;
        }
    };
    Population.prototype.getMaxFitness = function () {
        return this.population.reduce(function (prev, rocket) { return rocket.fitness > prev ? rocket.fitness : prev; }, 0);
    };
    Population.prototype.getMinFitness = function () {
        return this.population.reduce(function (prev, rocket) { return rocket.fitness < prev ? rocket.fitness : prev; }, 0);
    };
    return Population;
}());
exports.Population = Population;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DNA = void 0;
function randomVector() {
    return createVector(random(-1, 1), random(-1, 1));
}
var DNA = /** @class */ (function () {
    function DNA(size) {
        this.size = size;
        this.DNAList = [];
        this.generate();
    }
    DNA.prototype.generate = function () {
        this.DNAList = Array.from({ length: this.size }, function () { return randomVector(); });
    };
    DNA.prototype.generateFromParents = function (parents) {
        // Clear the DNAList Array
        this.DNAList = [];
        for (var i = 0; i < this.size; i++) {
            var parent_1 = parents[Math.floor(Math.random() * parents.length)];
            this.DNAList.push(parent_1.getFromDNA(i));
        }
    };
    DNA.prototype.getFromDNA = function (index) {
        return this.DNAList[index];
    };
    DNA.prototype.mutate = function (mutationsRate) {
        this.DNAList = this.DNAList.map(function (vector) {
            var doMutate = Math.random() < mutationsRate;
            if (doMutate)
                return randomVector();
            return vector;
        });
    };
    return DNA;
}());
exports.DNA = DNA;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rocket = void 0;
var dna_1 = __webpack_require__(2);
var Rocket = /** @class */ (function () {
    function Rocket(DNASize, spawnPos, parentDNA) {
        this.DNASize = DNASize;
        this.parentDNA = parentDNA;
        this.fitness = 0;
        this.hitTarget = false;
        this.isDead = false;
        this.myTime = 0;
        this.size = 4;
        this.pos = spawnPos.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.genes = parentDNA || new dna_1.DNA(DNASize);
    }
    Rocket.prototype.applyForce = function (force) {
        var newForce = force.copy();
        newForce.div(2);
        this.acc.add(newForce);
    };
    Rocket.prototype.doStep = function (i) {
        if (this.hitTarget || this.isDead)
            return;
        this.applyForce(this.genes.getFromDNA(i));
    };
    Rocket.prototype.update = function () {
        if (this.isDead) {
            this.myTime++;
            return;
        }
        if (this.hitTarget)
            return;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mult(0.99);
        this.acc.mult(0);
        this.myTime++;
    };
    Rocket.prototype.display = function () {
        ellipse(this.pos.x, this.pos.y, 1);
        var rot = this.vel.heading() + PI / 2;
        strokeWeight(1);
        stroke(0);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(rot);
        // Rocket body
        beginShape(TRIANGLES);
        vertex(0, -this.size);
        vertex(-this.size, this.size * 2);
        vertex(this.size, this.size * 2);
        endShape();
        pop();
    };
    Rocket.prototype.checkTarget = function (target) {
        this.hitTarget = (dist(this.pos.x, this.pos.y, target.x, target.y) < 10);
    };
    Rocket.prototype.calculateFitness = function (target) {
        var distanceToTarget = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = 1 / (distanceToTarget * pow(this.myTime, 3));
        if (this.hitTarget)
            this.fitness *= 0.5;
        if (this.isDead)
            this.fitness *= 2;
    };
    Rocket.prototype.checkEdges = function () {
        if (this.pos.x > width || this.pos.x < 0
            || this.pos.y > height) {
            this.isDead = true;
        }
    };
    return Rocket;
}());
exports.Rocket = Rocket;


/***/ })
/******/ ]);