import { toKelvin } from "../helpers/temperature";
import { atmosphericGas, Settings } from "../settings";
import { Gas, GasOptions } from "./gas";
import { PhysicsObject } from "./physics";
import { GasPreset } from "../gasses/interfaces";
import { deflateRaw } from "zlib";

interface DefaultContainer {
    temperature: number;
    pressure: number;
    width: number;
    height: number;
    depth: number;
    volume: number;
    gasPreset: GasPreset;
}

const defaultContainer = {
    temperature: toKelvin(20),
    pressure: Settings.atmosphericPressure,
    width: 10,
    height: 10,
    depth: 1
}

export class Container extends PhysicsObject {
    width: number;
    height: number;
    volume: number;
    depth: number;
    gas: Gas;

    constructor(Options?: Partial<DefaultContainer>) {
        super();
        const optionsToUse = Object.assign(defaultContainer, Options);
        this.width = optionsToUse.width;
        this.height = optionsToUse.height;
        this.depth = optionsToUse.depth;
        this.volume = optionsToUse.volume ? optionsToUse.volume : this.width * this.height * this.depth;

        let gas = new Gas({
            temperature: optionsToUse.temperature,
            pressure: optionsToUse.pressure,
            volume: this.volume,
            ...optionsToUse.gasPreset
        })

        this.gas = gas;
    }

    update() {
        const gravityVector = createVector(0, Settings.gravityConstant * this.mass);
        this.applyForce(gravityVector);

        const fOp = atmosphericGas.density * this.volume * Settings.gravityConstant;
        this.applyForce(createVector(0, -fOp));

        const fDrag = .05 * ((atmosphericGas.density * this.velocity.magSq()) / 2 * this.width);
        this.applyForce(this.velocity.copy().normalize().mult(-1).mult(fDrag));

        console.log(this.velocity, -fDrag);

        this.updatePhysics();
        this.checkEdges();
    }

    display() {
        text(JSON.stringify({
            fT: Settings.gravityConstant * this.mass,
            fOp: atmosphericGas.density * this.volume * Settings.gravityConstant,
            volume: this.volume,
            mass: this.mass,
            gasDensity: this.gas.density,
            gasTemp: this.gas.temperature,
            gasPressure: this.gas.pressure,
            gasConstant: Settings.gasConstant,
            gasMolarMass: this.gas.molarMass,
            "": "",
            airDensity: atmosphericGas.density,
            airTemp: atmosphericGas.temperature,
            airPressure: atmosphericGas.pressure,
            airMolarMass: atmosphericGas.molarMass
        }, undefined, 2), 10, 10);

        push();

        rectMode(CENTER);
        translate(this.position.x, this.position.y);
        const { r, g, b, alpha } = this.gas.color;
        fill(r, g, b, alpha);
        strokeWeight(2);
        stroke(0);
        rect(0, 0, this.width, this.height);

        pop();
    }

    get mass(): number {
        return this.gas.density * this.gas.volume;
    }
}