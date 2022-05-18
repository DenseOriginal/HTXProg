import { GenericPath } from "./generic";

export class LinearPath extends GenericPath {
  private a: number;
  private b: number;

  constructor() {
    super();

    const x1 = 0;
    const x2 = width;

    const randomY1 = random(0, height);
    const randomY2 = random(0, height);

    this.a = (randomY1 - randomY2) / (x1 - x2);
    this.b = randomY1;
  }

  calculate(x: number): number {
    return (this.a * x) + this.b;
  }
}