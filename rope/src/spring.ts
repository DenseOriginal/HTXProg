import { Vector } from "p5";
import { PhysicObject } from "./physic-object.interface";

type FIT = 'FIT';

export class Spring {
    frictionConstant = 0.002;
    springLength: number;

    constructor(
        public mass1: PhysicObject,
        public mass2: PhysicObject,
        springLength_: number | FIT,
        public stiffnes: number,
    ) {
        if(springLength_ == 'FIT') {
            this.springLength = mass1.pos.copy().sub(mass2.pos).mag();
        } else {
            this.springLength = springLength_;
        }

        console.log('Spring length: ' + this.springLength);
    }

    display() {
        push();
        if (this.mass1.pos.dist(this.mass2.pos) > this.springLength) {
            stroke(255, 100, 100)
        } else { stroke(0) }
        line(
            this.mass1.pos.x,
            this.mass1.pos.y,
            this.mass2.pos.x,
            this.mass2.pos.y
        );
        pop();
    }

    update() {
        let springVector = this.mass1.pos
            .copy()
            .sub(this.mass2.pos);
        
        let len = springVector.mag();
        let force: Vector = createVector();

        if(len != 0) {
            let forceToAdd = springVector.copy()
                .div(len)
                .mult(-1)
                .mult(len - this.springLength)
                .mult(this.stiffnes);

            force.add(forceToAdd);

            forceToAdd = this.mass1.velocity.copy()
                .sub(this.mass2.velocity)
                .mult(-1)
                .mult(this.frictionConstant);

            force.add(forceToAdd);

            this.mass1.applyForce(force);
            this.mass2.applyForce(force);
        }
    }
}