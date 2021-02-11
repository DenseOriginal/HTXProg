// Daniel Shiffman
// http://codingtra.in

import p5, { Vector } from "p5";

export class Vehicle {
    pos: Vector;
    target: Vector;
    vel: Vector;
    acc: Vector;

    maxSpeed: number;
    maxForce: number;

    constructor(x: number, y: number, public r: number = 8) {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();

        this.maxSpeed = 10;
        this.maxForce = 1;
    }

    behaviors() {
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY);
        // var flee = this.flee(mouse);

        arrive.mult(1);
        // flee.mult(5);

        this.applyForce(arrive);
        // this.applyForce(flee);
    }

    applyForce(f: Vector) {
        this.acc.add(f);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show() {
        stroke(255);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
    }

    arrive(target: Vector) {
        var desired = target.copy().sub(this.pos);
        var d = desired.mag();
        var speed = this.maxSpeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        var steer = desired.copy().sub(this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target: Vector) {
        var desired = target.copy().sub(this.pos);
        var d = desired.mag();
        if (d < 50) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = desired.copy().sub(this.vel);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    clone() {
        var v = new Vehicle(this.pos.x, this.pos.y);

        v.pos.x = this.pos.x;
        v.pos.y = this.pos.y;

        v.vel.x = this.vel.x;
        v.vel.y = this.vel.y;

        v.acc.x = this.acc.x;
        v.acc.y = this.acc.y;

        return v;
    }
}