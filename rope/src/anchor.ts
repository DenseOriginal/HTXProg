import { Vector } from "p5";
import { PhysicObject } from "./physic-object.interface";

export class Anchor implements PhysicObject {
    velocity = createVector();

    constructor(
        public pos: Vector,
        public size: number = 5,
        public mass: number = Infinity
    ) {}

    display() {
        push();
        rectMode(CENTER);
        fill(0);
        square(this.pos.x, this.pos.y, this.size);
        pop();
    }

    applyForce(f: Vector): void {}
}