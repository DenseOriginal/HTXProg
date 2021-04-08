export interface ValueMap<T> {
    a: T;
    b: T;
    c: T;
    A: T;
    B: T;
    C: T;
    O: T;
    areal: T;
}
export type keyofValueMap = keyof ValueMap<any>;

export interface Formel {
    requires: keyofValueMap[];
    returns: keyofValueMap;
    calculate(inputs: ValueMap<number | undefined>): number
}

const inputNames: { name: string, id: string }[] = [
    { name: 'Omkreds', id: 'O' },
    { name: 'Areal', id: 'areal' },
    { name: 'Vinkel C', id: 'C' },
    { name: 'Vinkel B', id: 'B' },
    { name: 'Vinkel A', id: 'A' },
    { name: 'Linje c', id: 'c' },
    { name: 'Linje b', id: 'b' },
    { name: 'Linje a', id: 'a' },
];

export function createInputs() {
    const inputField = document.getElementById('input-fields');

    inputNames.forEach(inp => {
        const html = `<div>
            <label for="${inp.id}">${inp.name}</label>
            <input type="number" id="${inp.id}" name="${inp.id}" class="inp"/>
        </div>`;
    
        const div = document.createElement('div');
        div.innerHTML = html.trim();
        inputField?.prepend(div.firstChild as Node);
    });
}

export function hasKnownBits(known: keyofValueMap[], needed: keyofValueMap[]): boolean {
    const knownArr = Object.values(known);
    return Object.values(needed).every(bit => knownArr.includes(bit));
}

//#region 
export function acos(inp: number) {
    return toDegrees(Math.acos(inp));
}

export function asin(inp: number) {
    return toDegrees(Math.asin(inp));
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
//#endregion

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

export function sinusRelations(aLinje: keyofValueMap, bLinje: keyofValueMap, aVinkel: keyofValueMap, bVinkel: keyofValueMap): Formel[] {
    return [
        {
            requires: [aVinkel, bLinje, bVinkel],
            returns: aLinje,
            calculate: ({ [aVinkel]: A, [bLinje]: b, [bVinkel]: B }) => (b ?? 0) / sin(B ?? 0) * sin(A ?? 0)
        },
        {
            requires: [bVinkel, aLinje, aVinkel],
            returns: bLinje,
            calculate: ({ [bVinkel]: B, [aLinje]: a, [aVinkel]: A }) => (a ?? 0) / sin(A ?? 0) * sin(B ?? 0)
        },
        {
            requires: [aLinje, bLinje, bVinkel],
            returns: aVinkel,
            calculate: ({ [aLinje]: a, [bLinje]: b, [bVinkel]: B }) => asin(( (a ?? 0) * sin(B ?? 0) ) / (b ?? 0))
        },
        {
            requires: [aLinje, bLinje, aVinkel],
            returns: bVinkel,
            calculate: ({ [aLinje]: a, [bLinje]: b, [aVinkel]: A }) => asin(( (b ?? 0) * sin(A ?? 0) ) / (a ?? 0))
        }
    ];
}