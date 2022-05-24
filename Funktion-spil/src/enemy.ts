import { player } from "./main";
import { ExponentialPath } from "./paths/exponential";
import { GenericPath } from "./paths/generic";
import { LinearPath } from "./paths/linear";
import { MixedPath } from "./paths/mixed";
import { SinusPath } from "./paths/sinus";
import { ScoreService } from "./score.service";

export const enemyRadius = 12.5;

export class Enemy {
  private path: GenericPath = new (random([
    LinearPath,
    SinusPath,
    ExponentialPath,
    MixedPath.from([SinusPath, LinearPath]),
    MixedPath.from([SinusPath, SinusPath]),
  ]))();
  public x = 0;
  public y = this.path.calculate(this.x);

  private offset = frameCount / 3;

  private scoreService = ScoreService.Instance;

  constructor() {
    Enemy.enemies.push(this);
  }

  draw() {
    push();

    noFill();
    colorMode(HSB, 100);
    stroke(this.offset % 100, 100, 80);
    this.y = this.path.calculate(this.x);
    translate(this.x, height - this.y);
    rotate(this.path.getAngle(this.x));
    // circle(0, 0, enemyRadius * 2);

    triangle(
      -enemyRadius, -enemyRadius,
      -enemyRadius, enemyRadius,
      enemyRadius, 0
    );

    pop();

    
    this.x += 3;

    if(this.x > width) {
      this.scoreService.increment(100);
      Enemy.removeSelf(this);
    }
  }

  colide() {
    this.scoreService.decrement(300);
    Enemy.removeSelf(this);
  }

  static enemies: Enemy[] = [];
  static forEach = (fn: (value: Enemy, index: number, arr: Enemy[]) => void) => Enemy.enemies.forEach(fn);
  private static removeSelf(t: Enemy) {
    const index = Enemy.enemies.indexOf(t);
    Enemy.enemies.splice(index, 1);
  }
}