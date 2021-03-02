import { Vector } from "p5";
import { settings } from "../settings";
import { Gas } from "./gas";

export class Container {
    position: Vector = createVector(width / 2, height / 2);
    acceleration: Vector = createVector(0, 0);
    velocity: Vector = createVector(0, 0);

    constructor(
        public mass: number,
        public volume: number,
        public gas: Gas
    ) { }

    applyForce(f: Vector): void {
        this.acceleration.add(f);
    }

    update() {
        // M * g
        const fT = (this.mass + (this.gas.density * this.volume)) * settings.tyngdeAcceleration;
        const fTTransformed = 1;

        // V_genstand * Rho_atm * g
        let fOpDensity = this.position.y > 600 ? settings.lowerGas.density : settings.atmGas.density;
        const fOp = this.volume * fOpDensity * settings.tyngdeAcceleration;
        const fOpTransformed = -(1 / fT * fOp);

        text(JSON.stringify({
            fT,
            fOp,
            temp: this.gas.temperature
        }, undefined, 2), 10, 10);

        const fTVector = createVector(0, fTTransformed);
        const fOpVector = createVector(0, fOpTransformed);

        push();
        strokeWeight(2);
        stroke(255, 175, 175);
        drawArrow(this.position, fTVector.copy().mult(40), 7);
        stroke(175, 255, 175);
        drawArrow(this.position, fOpVector.copy().mult(40), 7);
        pop();

        this.applyForce(fTVector);
        this.applyForce(fOpVector);

        this.velocity.add(this.acceleration);
        this.velocity.mult(.95);
        this.acceleration.mult(0);
        this.position.add(this.velocity);
        this.checkEdges();
    }

    display() {
        circle(this.position.x, this.position.y, 30);
    }

    checkEdges() {
        if (this.position.y > height) { this.velocity.y *= -.2; this.position.y = height };
        if (this.position.y < 0) { this.velocity.y *= -.2; this.position.y = 0 };
    }
}

function drawArrow(base: Vector, vec: Vector, s: number) {
	push();
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	let arrowSize = s;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
}