export class Maths {
    numbers: number[];
    length: number;

    constructor(numbers: number[]) {
        this.numbers = numbers.sort((a, b) => a - b);
        this.length = numbers.length;
    }

    public min() {
        return this.numbers[0];
    }

    public max() {
        return this.numbers.at(-1) as number;
    }

    // Print all the stuff that doesnt require input
    public autoPrint() {
        console.log("Min: ", this.min());
        console.log("Max: ", this.max());
        console.log("Variations bredde: ", this.variationsBredde());
        console.log("Median: ", this.median());
        console.log("Gennemsnit: ", this.gennemsnit());
        console.log("Skævhed: ", this.skævhed());
        console.log("Kvartiler: ");
        this.kvartiler().forEach((Q, idx) => console.log(`\tQ${idx}`, Q));
        console.log("Kvartil afstand: ", this.kvartilAfstand());
        console.log("Varians: ", this.varians());
        console.log("Spredning: ", this.spredning());
        console.log('Hyppighed:');
        console.table(this.hyppighed());
        console.log('Frekvens:');
        console.table(this.frekvens());
    }

    private numberAt(index: number) {
        return this.numbers[Math.ceil(index) - 1];
    }

    public median() {
        const middle = this.length / 2;

        return isEven(this.length) ?
            (this.numberAt(middle) + this.numberAt(middle + 1)) / 2 :
            this.numberAt(middle)
    }

    public gennemsnit() {
        return this.numbers.reduce((a, b) => a + b) / this.length;
    }

    public skævhed() {
        return this.gennemsnit() == this.median() ?
            undefined :
            this.gennemsnit() > this.median() ?
                'højre' : 'venstre'; 
    }

    public variationsBredde() {
        return this.max() - this.min();
    }

    public kvartiler() {
        return [
            this.numbers[0],
            this.fraktil(0.25),
            this.median(),
            this.fraktil(0.75),
            this.numbers.at(-1) as number
        ];
    }

    public kvartilAfstand() {
        const [, Q1,, Q3] = this.kvartiler();
        return Q3 - Q1;
    }

    public fraktil(procent: number) {
        const index = Math.ceil(this.numbers.length * procent);
        return this.numberAt(index);
    }

    public hyppighed() {
        const occurrences: Record<number, number> = {};

        for(const number of this.numbers) {
            occurrences[number] = (occurrences[number] || 0) + 1;
        }
        return occurrences;
    }

    public frekvens() {
        const occurrences = this.hyppighed();
        const frekvens: Record<number, number> = {};

        for(const property in occurrences) {
            frekvens[property] = occurrences[property] / this.length;
        }

        return frekvens;
    }

    public varians(target = this.gennemsnit()) {
        return this.numbers.reduce((acc, num) => acc + (num-target)**2) / this.length;
    }

    public spredning(target = this.gennemsnit()) {
        return Math.sqrt(this.varians(target));
    }
}

function isEven(n: number) {
    return n % 2 == 0;
}