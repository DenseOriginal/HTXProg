import { ColorObject } from "../gasses/interfaces";
import { toKelvin } from "../helpers/temperature";
import { Settings } from "../settings";

const defaultGas = {
    temperature: toKelvin(20),
    pressure: 101325,
    volume: 10,
    molarMass: 0.0291,
    color: { r: 255, g: 255, b: 255 }
}

export type GasOptions = Partial<typeof defaultGas>;

export class Gas implements GasOptions {
    temperature: number;
    pressure: number;
    volume: number;
    color: ColorObject;
    readonly molarMass: number;

    constructor(Options?: GasOptions) {
        const optionsToUse = Object.assign(defaultGas, Options);
        this.pressure = optionsToUse.pressure;
        this.volume = optionsToUse.volume;
        this.molarMass = optionsToUse.molarMass;
        this.temperature = optionsToUse.temperature;
        this.color = optionsToUse.color;
    }

    get density(): number {
        return (this.molarMass / Settings.gasConstant) * (this.pressure / this.temperature);
    }
}