interface ValueMap<T> {
    a: T;
    b: T;
    c: T;
    A: T;
    B: T;
    C: T;
}

interface Formel {
    requires: keyofValueMap[];
    returns: keyofValueMap;
    calculate(inputs: ValueMap<number | undefined>): number
};

function linjeStykkeFactory(vinkel: keyofValueMap, aLinje: keyofValueMap, bLinje: keyofValueMap, returns: keyofValueMap): Formel {
    const calculateFunc = (inputs: ValueMap<number | undefined>) => {
        const vinkelVal = inputs[vinkel] as number;
        const bVal = inputs[aLinje] as number;
        const cVal = inputs[bLinje] as number;
        return Math.sqrt(bVal**2 + cVal**2 - 2*bVal*cVal*Math.cos(vinkelVal))
    }

    return {
        requires: [vinkel, aLinje, bLinje],
        returns,
        calculate: calculateFunc
    }
}

function vinkelFormelFactory(aLinje: keyofValueMap, bLinje: keyofValueMap, cLinje: keyofValueMap, returns: keyofValueMap): Formel {
    const calculateFunc = (inputs: ValueMap<number | undefined>) => {
        const a = inputs[aLinje] as number;
        const b = inputs[bLinje] as number;
        const c = inputs[cLinje] as number;
        return Math.acos((b**2 + c**2 - a**2) / (2*b*c));
    }

    return {
        requires: [aLinje, bLinje, cLinje],
        returns,
        calculate: calculateFunc
    }
}

export const formler: Formel[] = [
    linjeStykkeFactory('A', 'b', 'c', 'a'),
    linjeStykkeFactory('B', 'a', 'c', 'b'),
    linjeStykkeFactory('C', 'a', 'b', 'c'),
    vinkelFormelFactory('a', 'b', 'c', 'A'),
    vinkelFormelFactory('b', 'c', 'a', 'B'),
    vinkelFormelFactory('c', 'a', 'b', 'C'),
]