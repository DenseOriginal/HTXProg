import { Vector } from "p5";
import { DNA } from "./dna";
import { Rocket } from "./rocket";

export class Population {
	population: Rocket[] = [];
	matingPool: DNA[] = [];
	stepsTaken: number = 0;
	flightPattern: Vector[] = [];

	constructor(
		public populationSize: number,
		public stepsInGeneration: number,
		public target: Vector,
		public rocketSpawnPos: Vector,
		public mutationRate: number
	) { }

	generatePopulation(): void {
		for (let i = 0; i < this.populationSize; i++) {
			let newRocket = new Rocket(
				this.stepsInGeneration,
				this.rocketSpawnPos
			);

			this.population.push(newRocket);
		}
	}

	run(): void {
		if (this.stepsTaken >= this.stepsInGeneration) {
			this.evolve();
			return;
		}

		let sumPosition = createVector(0, 0);

		// Draw flight patter
		stroke(0);
		noFill();
		beginShape();
		this.flightPattern.forEach(pos => vertex(pos.x, pos.y))
		endShape();

		// Rocket color
		fill(255);
		stroke(0);
		
		this.population.forEach(rocket => {
			rocket.doStep(this.stepsTaken);
			rocket.update();
			rocket.checkTarget(this.target);
			rocket.checkEdges();
			rocket.display();

			sumPosition.add(rocket.pos);
		});

		sumPosition.div(this.population.length);
		this.flightPattern.push(sumPosition);
		this.stepsTaken++;
	}

	evolve(): void {
		this.calculateFitness();
		this.createMatingPool();
		this.reproduction();

		this.stepsTaken = 0;
		this.flightPattern = [];
	}

	calculateFitness(): void {
		this.population.forEach(rocket => rocket.calculateFitness(this.target));
	}

	createMatingPool(): void {
		this.matingPool = [];
		let maxFitness = this.getMaxFitness();
		let minFitness = this.getMinFitness();

		this.population.forEach(rocket => {
			let fitnessNormal = map(rocket.fitness, minFitness, maxFitness, 0, 1);

			// Amount of this perticulary rocket's genes in the mating pool
			let amountInMatingPool = fitnessNormal * 100;
			for (let i = 0; i < amountInMatingPool; i++) {
				this.matingPool.push(rocket.genes);
			}
		});
	}

	reproduction(): void {
		for (let i = 0; i < this.populationSize; i++) {
			let mom: DNA = random(this.matingPool);
			let dad: DNA = random(this.matingPool);

			let newDNA = new DNA(this.stepsInGeneration);
			newDNA.generateFromParents([mom, dad]);
			newDNA.mutate(this.mutationRate);

			let newRocket = new Rocket(
				this.stepsInGeneration,
				this.rocketSpawnPos,
				newDNA
			);

			this.population[i] = newRocket;
		}
	}

	getMaxFitness(): number {
		return this.population.reduce((prev, rocket) => rocket.fitness > prev ? rocket.fitness : prev, 0)
	}

	getMinFitness(): number {
		return this.population.reduce((prev, rocket) => rocket.fitness < prev ? rocket.fitness : prev, 0)
	}
}