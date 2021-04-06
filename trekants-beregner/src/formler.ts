import { Formel, linjeStykkeFactory, vinkelFormelFactory } from "./helpers";


export const formler: Formel[] = [
    linjeStykkeFactory('A', 'b', 'c', 'a'),
    linjeStykkeFactory('B', 'a', 'c', 'b'),
    linjeStykkeFactory('C', 'a', 'b', 'c'),
    vinkelFormelFactory('a', 'b', 'c', 'A'),
    vinkelFormelFactory('b', 'c', 'a', 'B'),
    vinkelFormelFactory('c', 'a', 'b', 'C'),
]