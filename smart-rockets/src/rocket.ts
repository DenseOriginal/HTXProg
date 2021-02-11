import { Vector } from "p5";
import { DNA } from "./dna";

export class Rocket {
    pos: Vector;
    vel: Vector;
    acc: Vector;

    genes: DNA;

    fitness: number = 0;
    hitTarget: boolean = false;
    isDead: boolean = false;
    myTime: number = 0;

    size = 4;

    constructor(
        public DNASize: number,
        spawnPos: Vector,
        public parentDNA?: DNA
    ) {
        this.pos = spawnPos.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.genes = parentDNA || new DNA(DNASize);
    }

    applyForce(force: Vector): void {
        let newForce = force.copy();
        newForce.div(2);
        this.acc.add(newForce);
    }

    doStep(i: number): void {
        if (this.hitTarget || this.isDead) return;

        this.applyForce(this.genes.getFromDNA(i));
    }

    update(): void {
        if (this.isDead) { this.myTime++; return }
        if (this.hitTarget) return;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mult(0.99);
        this.acc.mult(0);

        this.myTime++;
    }

    display(): void {
        ellipse(this.pos.x, this.pos.y, 1);

        let rot = this.vel.heading() + PI / 2;
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
    }

    checkTarget(target: Vector): void {
        this.hitTarget = (dist(this.pos.x, this.pos.y, target.x, target.y) < 10);
    }

    calculateFitness(target: Vector): void {
        let distanceToTarget = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = 1 / (distanceToTarget * pow(this.myTime, 3));
        if (this.hitTarget) this.fitness *= 0.5
        if (this.isDead) this.fitness *= 2;
    }

    checkEdges(): void {
        if (this.pos.x > width || this.pos.x < 0
            || this.pos.y > height) {
            this.isDead = true;
        }
    }
}