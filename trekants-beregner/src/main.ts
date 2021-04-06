import { formler } from "./formler";
import { hasKnownBits, keyofValueMap, ValueMap } from "./helpers";

const inputs: ValueMap<HTMLInputElement> = [...document.getElementsByClassName('inp') as any].reduce((acc, cur: HTMLInputElement) => {
    const id = cur.id as keyofValueMap;
    acc[id] = cur;
    return acc;
}, {});


document.getElementById('submit')?.addEventListener('click', udregn);
function udregn() {
    const knownValues: keyofValueMap[] = [];
    const values = Object.entries(inputs).reduce((acc, cur) => {
        const [key, elm] = cur as [keyofValueMap, HTMLInputElement];
        const { value } = elm;
        if(value) knownValues.push(key);
        
        acc[key] = value ? Number(value) : undefined;

        return acc;
    }, {} as ValueMap<number | undefined>);
    if(knownValues.length < 3) {console.log('Not enough values'); return;}

    formler
        .filter(f => !knownValues.includes(f.returns))
        .filter(f => hasKnownBits(knownValues, f.requires))
        .forEach(f => console.log(`Calculating ${f.returns}, result is: ${f.calculate(values)}`));
}