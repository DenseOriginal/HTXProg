export abstract class GenericPath {
  abstract calculate(x: number): number;

  getAngle(x: number): number {
    return atan( 2 / (this.calculate(x-1) - this.calculate(x+1)) ) + 90;
  }
}