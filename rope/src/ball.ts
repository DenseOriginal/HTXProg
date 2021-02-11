import { Vector } from "p5";
import { PhysicObject } from "./physic-object.interface";

export class Ball implements PhysicObject {
    velocity = createVector(0, 0);
    acceleration = createVector(0, 0);

    constructor(
        public pos: Vector = createVector(width / 2, height / 2),
        public radius: number = 10,
        public bouncyness: number = 0.2,
        public mass: number = 10
    ) { }

    applyForce(f: Vector) {
        let newForce = f.copy();
        this.acceleration.add(newForce);
    }

    update() {
        this.checkEdges();
        this.velocity.add(this.acceleration);
        this.velocity.mult(0.99)
        this.pos.add(this.velocity);
        this.acceleration.mult(0);

        this.pos.set(
            constrain(this.pos.x, this.radius, width - this.radius),
            constrain(this.pos.y, -Infinity, height - this.radius)
        );
    }

    display() {
        stroke(0);
        strokeWeight(1);
        circle(this.pos.x, this.pos.y, this.radius * 2);

        if (this.pos.y < -this.radius) {
            stroke(255, 100, 100);
            strokeWeight(3);
            line(this.pos.x, 5, this.pos.x, 25);
        }
    }

    checkEdges() {
        if (this.pos.x - this.radius <= 0 || this.pos.x >= width - this.radius) {
            this.velocity.x *= -this.bouncyness;
        }

        if (this.pos.y >= height - this.radius) {
            this.velocity.y *= -this.bouncyness;
        }
    }
}