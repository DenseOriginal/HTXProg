export function hasKnownBits(known: keyofValueMap[], needed: keyofValueMap[]): boolean {
    const knownArr = Object.values(known);
    return Object.values(needed).every(bit => knownArr.includes(bit));
}