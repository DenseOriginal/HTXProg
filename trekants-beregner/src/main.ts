import { formler } from "./formler";
import { createInputs, hasKnownBits, keyofValueMap, ValueMap } from "./helpers";
import "./p5";

createInputs();

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
        if (value) knownValues.push(key);

        acc[key] = value ? Number(value) : undefined;

        return acc;
    }, {} as ValueMap<number | undefined>);

    let formulas = formler
        .filter(f => !knownValues.includes(f.returns))
        .filter(f => hasKnownBits(knownValues, f.requires));

    if (formulas.length < 1) { log('Not enough values'); return; }

    while (formulas.length >= 1) {
        formulas.forEach(f => {
            const result = f.calculate(values);
            values[f.returns] = result;
            inputs[f.returns].value = result.toFixed(2).toString();
            knownValues.push(f.returns);
            console.log(`Calculating ${f.returns}, result is: ${result}`)
        });

        formulas = formler
            .filter(f => !knownValues.includes(f.returns))
            .filter(f => hasKnownBits(knownValues, f.requires));

    }


}

document.getElementById('reset')?.addEventListener('click', () => Object.values(inputs).forEach(i => i.value = ''));
const log = (msg: string) => (document.getElementById('output') as any).innerHTML = msg;