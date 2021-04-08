import { Formel, linjeStykkeFactory, vinkelFormelFactory, twoVinklerFactory, sinusRelations } from "./helpers";


export const formler: Formel[] = [
    linjeStykkeFactory('A', 'b', 'c', 'a'),
    linjeStykkeFactory('B', 'a', 'c', 'b'),
    linjeStykkeFactory('C', 'a', 'b', 'c'),
    vinkelFormelFactory('a', 'b', 'c', 'A'),
    vinkelFormelFactory('b', 'c', 'a', 'B'),
    vinkelFormelFactory('c', 'a', 'b', 'C'),
    twoVinklerFactory('A', 'B', 'C'),
    twoVinklerFactory('C', 'A', 'B'),
    twoVinklerFactory('B', 'C', 'A'),
    ...sinusRelations('a', 'b', 'A', 'B'),
    ...sinusRelations('a', 'c', 'A', 'C'),
    ...sinusRelations('c', 'b', 'C', 'B'),
    {
        requires: ['a', 'b', 'c'],
        returns: 'O',
        calculate: ({ a, b, c }) => (a ?? 0) + (b ?? 0) + (c ?? 0)
    }
]