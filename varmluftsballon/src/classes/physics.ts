import { Vector } from "p5";

export abstract class PhysicsObject {
    position: Vector = createVector(0, 0);
    velocity: Vector = createVector(0, 0);
    acceleration: Vector = createVector(0, 0);
    get mass(): number {
        return 10;
    };

    constructor() { }

    applyForce(f: Vector) {
        let forceToApply = f.copy().div(10);
        this.acceleration.add(forceToApply);
    }

    updatePhysics() {
        // Velocity changes according to acceleration
        this.velocity.add(this.acceleration);
        // position changes by velocity
        this.position.add(this.velocity);
        // We must clear acceleration each frame
        this.acceleration.mult(0);
    }

    checkEdges() {
        // if(this.position.x < 0 || this.position.x > width) this.velocity.mult(-0.5);
        // if(this.position.y < 0 || this.position.y > height) this.velocity.mult(-0.5);

        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x > width) this.position.x = width;
        if(this.position.y < 0) this.position.y = 0;
        if(this.position.y > height) this.position.y = height;
    }

}