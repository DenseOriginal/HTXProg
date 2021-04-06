export type ColorObject = { r: number, g: number, b: number, alpha?: number };

export interface GasPreset {
    molarMass: number,
    color: ColorObject
}