import { Gas } from "./classes/gas";
import { toKelvin } from "./helpers/temperature";

interface SettingsInterface {
    temperature: number;
    gasConstant: number;
    atmosphericPressure: number;
    gravityConstant: number;
}

export const Settings: SettingsInterface = {
    temperature: toKelvin(20),
    gasConstant: 8.31,
    atmosphericPressure: 101325,
    gravityConstant: 9.82
}

export const atmosphericGas = new Gas({ volume: 5e18 });