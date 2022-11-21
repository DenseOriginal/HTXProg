import { Maths } from "../lib/maths";

const numbers = new Maths([0,2,2,2,4,4,4,4,7,7,7,7,7,7,7,7,7,7,10,10,10,10,12,12,12,12,12]);

console.log(numbers.fraktil(0.90));