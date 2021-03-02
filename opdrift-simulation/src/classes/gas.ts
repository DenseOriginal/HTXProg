import { MaterialInterface } from "./materiale.interface";

export interface GasConstructor {
    pressure: number,
    temperature: number,
    molarMass: number
}

export class Gas implements MaterialInterface, GasConstructor {
    pressure: number;
    temperature: number;
    readonly molarMass: number;

    constructor(options: GasConstructor) {
        this.pressure = options.pressure;
        this.temperature = options.temperature;
        this.molarMass = options.molarMass;
    }

    get density(): number {
        return (this.molarMass / 8.31) * (this.pressure / this.temperature);
    }
}