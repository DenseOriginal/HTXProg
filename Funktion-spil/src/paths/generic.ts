export abstract class GenericPath {
  abstract calculate(x: number): number;

  getAngle(x: number): number {
    return atan( (this.calculate(x-1) - this.calculate(x+1)) / 2 );
  }
}