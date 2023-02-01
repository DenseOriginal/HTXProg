const possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const timeAndLog = (pass: string) =>
    console.log(`Time to bruteforce '${pass}': ${time(timeBruteForce, pass)} ms`);

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

function timeBruteForce(pass: string) {
    let combi: number[] = [];
    const hashedPass = pass.split('').map(char => possibleChars.indexOf(char)).join(',');
    while ((combi = incrementList(combi, possibleChars.length)).join(',') != hashedPass) continue;
}

timeAndLog('Hej');
timeAndLog('aabj');

function time<T extends (...args: P) => any, P extends Array<unknown>>(f: T, ...args: P) {
    const start = Date.now();

    f(...args);

    const end = Date.now();
    return end - start;
}