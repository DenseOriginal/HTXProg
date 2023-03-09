function getRoots(equation) {
    const {a, b, c} = equation;

    // Deskriminanten
    const D = b**2 - 4 * a * c;
    if(D < 0) return [];
    let X1 = (-(b) + Math.sqrt(D)) / (2 * a)
    let X2 = (-(b) - Math.sqrt(D)) / (2 * a)
    
    return [...new Set([X1, X2])];
}

console.log(
    getRoots({a: 0.5, b: 2, c: 2})
);