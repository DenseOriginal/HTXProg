import { Gas } from "./classes/gas";

class Settings {
    atmGas: Gas = new Gas({
        pressure: 101325, // Pa
        temperature: 293.15, // K
        molarMass: 0.0291 // kg / mol
    });

    lowerGas: Gas = new Gas({
        pressure: 101325, // Pa
        temperature: 293.15, // K
        molarMass: 0.2 // kg / mol
    });

    tyngdeAcceleration = 9.82;
}

export const settings = new Settings;