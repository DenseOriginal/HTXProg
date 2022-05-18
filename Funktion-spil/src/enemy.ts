import { GenericPath } from "./paths/generic";
import { LinearPath } from "./paths/linear";
import { SinusPath } from "./paths/sinus";

export class Enemy {
  private path: GenericPath = new (random([LinearPath, SinusPath]))();
  private x = 0;
  private y = this.path.calculate(this.x);

  private offset = frameCount / 3;


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
    rotate(-this.path.getAngle(this.x));
    circle(0, 0, 25);

    pop();

    
    this.x += 3;

    if(this.x > width) Enemy.removeSelf(this);
  }

  static enemies: Enemy[] = [];
  static forEach = (fn: (value: Enemy, index: number, arr: Enemy[]) => void) => Enemy.enemies.forEach(fn);
  private static removeSelf(t: Enemy) {
    const index = Enemy.enemies.indexOf(t);
    Enemy.enemies.splice(index, 1);
  }
}