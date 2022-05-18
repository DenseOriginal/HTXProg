import { GenericPath } from "./generic";

// Dead zone at top or bottom of the screen, in pixels
const topBottomMargin = 50;

export class SinusPath extends GenericPath {
  private a: number;
  private b: number;
  private d: number;

  constructor() {
    super();

    // Get random d, this is the starting point
    this.d = random(topBottomMargin, height - topBottomMargin);

    const maxAmplitude = Math.min(this.d, height - this.d);
    this.a = random(-maxAmplitude, maxAmplitude);

    this.b = random(-2, 2);
  }

  calculate(x: number): number {
    return this.a * sin(this.b * x) + this.d;
  }
}