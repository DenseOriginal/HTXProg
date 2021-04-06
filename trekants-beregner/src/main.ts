interface ValueMap<T> {
    a: T;
    b: T;
    c: T;
    A: T;
    B: T;
    C: T;
}

type keyofValueMap = keyof ValueMap<any>;

const inputs: ValueMap<HTMLInputElement> = [...document.getElementsByClassName('inp') as any].reduce((acc, cur: HTMLInputElement) => {
    const { id: _id, name } = cur;
    const id = _id as keyofValueMap;

    acc[id] = cur;
    return acc;
}, {});


document.getElementById('submit')?.addEventListener('click', udregn);
function udregn() {
    let knownValues = 0;
    const values = Object.entries(inputs).reduce((acc, cur) => {
        const [key, elm] = cur as [keyofValueMap, HTMLInputElement];
        const { value } = elm;
        if(value && !isNaN(value as any)) knownValues++;
        acc[key] = value as any;

        return acc;
    }, {} as ValueMap<number>)    
}

function linjeStykkeFactory(vinkel: keyofValueMap, bLinje: keyofValueMap, cLinje: keyofValueMap) {
    return (inputs: ValueMap<number>) => {
        const vinkelVal = inputs[vinkel];
        const bVal = inputs[bLinje];
        const cVal = inputs[cLinje];
        return Math.sqrt(bVal**2 + cVal**2 - 2*bVal*cVal*Math.cos(vinkelVal))
    }
}

linjeStykkeFactory('A', 'b', 'c');