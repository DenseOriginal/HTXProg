import { GenericPath } from "./generic";

type GenericPathConstructor = new () => GenericPath;

export abstract class MixedPath extends GenericPath {
  protected abstract paths: GenericPath[];

  calculate(x: number): number {
    return this.paths.reduce((acc, cur) => acc += cur.calculate(x), 0);
  }

  static from(paths: GenericPathConstructor[]): GenericPathConstructor {
    return class extends MixedPath {
      protected paths: GenericPath[] = paths.map(cur => new cur());
    }
  }
}