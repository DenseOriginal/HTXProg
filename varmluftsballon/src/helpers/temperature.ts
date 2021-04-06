export function toKelvin(celsius: number): number {
    if(celsius < -273.15) throw new Error('Celsius input is less than -273.15');
    return celsius + 273.15;
}

export function toCelcius(kelvin: number): number {
    if(kelvin < 0) throw new Error('Kelvin input is less than 0');
    return kelvin - 273.15;
}