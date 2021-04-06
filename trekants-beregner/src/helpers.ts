export interface ValueMap<T> {
    a: T;
    b: T;
    c: T;
    A: T;
    B: T;
    C: T;
}
export type keyofValueMap = keyof ValueMap<any>;

export interface Formel {
    requires: keyofValueMap[];
    returns: keyofValueMap;
    calculate(inputs: ValueMap<number | undefined>): number
}

export function hasKnownBits(known: keyofValueMap[], needed: keyofValueMap[]): boolean {
    const knownArr = Object.values(known);
    return Object.values(needed).every(bit => knownArr.includes(bit));
}

export function acos(inp: number) {
    return toDegrees(Math.acos(inp));
}

export function cos(angle: number) {
    return Math.cos(toRadians(angle));
}

export function sin(angle: number) {
    return Math.sin(toRadians(angle));
}

export function toDegrees(angle: number) {
    return angle * (180 / Math.PI);
}

export function toRadians(angle: number) {
    return angle * (Math.PI / 180);
}


export function linjeStykkeFactory(vinkel: keyofValueMap, aLinje: keyofValueMap, bLinje: keyofValueMap, returns: keyofValueMap): Formel {
    const calculateFunc = (inputs: ValueMap<number | undefined>) => {
        const vinkelVal = inputs[vinkel] as number;
        const bVal = inputs[aLinje] as number;
        const cVal = inputs[bLinje] as number;
        return Math.sqrt(bVal ** 2 + cVal ** 2 - 2 * bVal * cVal * cos(vinkelVal))
    }

    return {
        requires: [vinkel, aLinje, bLinje],
        returns,
        calculate: calculateFunc
    }
}

export function vinkelFormelFactory(aLinje: keyofValueMap, bLinje: keyofValueMap, cLinje: keyofValueMap, returns: keyofValueMap): Formel {
    const calculateFunc = (inputs: ValueMap<number | undefined>) => {
        const a = inputs[aLinje] as number;
        const b = inputs[bLinje] as number;
        const c = inputs[cLinje] as number;
        return acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c));
    }

    return {
        requires: [aLinje, bLinje, cLinje],
        returns,
        calculate: calculateFunc
    }
}

export function twoVinklerFactory(aVinkel: keyofValueMap, bVinkel: keyofValueMap, returns: keyofValueMap): Formel {
    const calculateFunc = (inputs: ValueMap<number | undefined>) => {
        const A = inputs[aVinkel] as number;
        const B = inputs[bVinkel] as number;
        return 180 - A - B;
    }

    return {
        requires: [aVinkel, bVinkel],
        returns,
        calculate: calculateFunc
    }
}