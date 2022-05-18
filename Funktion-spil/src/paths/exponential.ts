import { player } from "../main";
import { GenericPath } from "./generic";

export class ExponentialPath extends GenericPath {
  private a: number;
  private b: number;
  
  constructor() {
    super();

    const x1 = 0;
    const x2 = player.x;

    const y1 = random(0, height);
    const y2 = height - player.y;

    this.a = pow((y2 / y1), 1/(x2-x1));
    this.b = (y2) / (pow(this.a, x2));
  }

  calculate(x: number): number {
    return this.b * pow(this.a, x);
  }
}