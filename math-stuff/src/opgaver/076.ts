import { Maths } from "../lib/maths";

// Grouped numbers
const numbers = new Maths([
    2,
    4,
    3,
    2,
    6,
    4,
    2,
    1,
    2,
    1
]);

// Ungroupes numbers
// const numbers = new Maths([
//     134,
//     132,
//     135,
//     148,
//     116,
//     139,
//     132,
//     156,
//     113,
//     128,
//     139,
//     115,
//     125,
//     122,
//     152,
//     130,
//     137,
//     131,
//     132,
//     127,
//     103,
//     122,
//     134,
//     136,
//     147,
//     104,
//     122,
//     116
// ]);

// numbers.autoPrint();
console.log(numbers.fraktil(0.10));
console.log(numbers.fraktil(0.25));
console.log(numbers.fraktil(0.90));
