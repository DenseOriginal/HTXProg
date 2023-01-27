const possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function* iteratePosibilities(chars: string, maxLength = Infinity) {
    let combi: number[] = [0];
    const lenOfChars = chars.length;

    while (true && combi.length <= maxLength) {
        yield combi.map(idx => chars[idx]).join('');
        combi = incrementList(combi, lenOfChars);
    }
}

function incrementList(list: number[], base: number) {
    let carry = true;
    const incrementedList = list.map(val => {
        const newVal = carry ? (val + 1) % base : val;
        carry = carry && newVal == 0;
        return newVal;
    });

    if (carry) incrementedList.push(0);
    return incrementedList;
}

function timeBruteForce(pass: string): number {
    const start = Date.now();

    const passIterator = iteratePosibilities(possibleChars);
    while (passIterator.next().value != pass) { }

    const end = Date.now();
    return end - start;
}

console.log(`Time to bruteforce 'Hej': ${timeBruteForce('Hej')} ms`);
console.log(`Time to bruteforce 'Hello': ${timeBruteForce('Hello')} ms`);

