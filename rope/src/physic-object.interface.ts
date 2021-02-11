import { Vector } from "p5";

export interface PhysicObject {
    pos: Vector,
    velocity: Vector,
    mass: number,
    applyForce: (f: Vector) => void
}