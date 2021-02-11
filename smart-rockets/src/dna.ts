import { Vector } from "p5";

function randomVector(): Vector {
    return createVector(random(-1, 1), random(-1, 1));
}

export class DNA {
    DNAList: Vector[] = [];

    constructor(public size: number) {
        this.generate();
    }

    generate(): void {
        this.DNAList = Array.from({ length: this.size }, () => randomVector());
    }

    generateFromParents(parents: DNA[]): void {
        // Clear the DNAList Array
        this.DNAList = [];

        for (let i = 0; i < this.size; i++) {
            let parent = parents[Math.floor(Math.random() * parents.length)];
            
            this.DNAList.push(parent.getFromDNA(i));
        }
    }

    getFromDNA(index: number): Vector {
        return this.DNAList[index];
    }

    mutate(mutationsRate: number): void {
        this.DNAList = this.DNAList.map(vector => {
            let doMutate = Math.random() < mutationsRate;
            if(doMutate) return randomVector();
            return vector;
        })
    }
}