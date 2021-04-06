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
    const id = cur.id as keyofValueMap;
    acc[id] = cur;
    return acc;
}, {});


document.getElementById('submit')?.addEventListener('click', udregn);
function udregn() {
    let knownValues = 0;
    const values = Object.entries(inputs).reduce((acc, cur) => {
        const [key, elm] = cur as [keyofValueMap, HTMLInputElement];
        const { value } = elm;
        if(value) knownValues++;
        console.log(typeof value);
        
        acc[key] = value ? Number(value) : undefined;

        return acc;
    }, {} as ValueMap<number | undefined>);
    if(knownValues < 3) {console.log('Not enough values'); return;}

    
}