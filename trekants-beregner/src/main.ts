import { formler } from "./formler";
import { hasKnownBits, keyofValueMap, ValueMap } from "./helpers";

const inputNames: { name: string, id: string }[] = [
    { name: 'Vinkel C', id: 'C' },
    { name: 'Vinkel B', id: 'B' },
    { name: 'Vinkel A', id: 'A' },
    { name: 'Linje c', id: 'c' },
    { name: 'Linje b', id: 'b' },
    { name: 'Linje a', id: 'a' },
];

inputNames.forEach(inp => {
    const html = `<div>
        <label for="${inp.id}">${inp.name}</label>
        <input type="number" id="${inp.id}" name="${inp.id}" class="inp"/>
    </div>`;

    const div = document.createElement('div');
    div.innerHTML = html.trim();
    document.body.prepend(div.firstChild as Node);
});

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

    if (formulas.length < 1) { console.log('Not enough values'); return; }

    while (formulas.length >= 1) {
        console.log(formulas.length);

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
