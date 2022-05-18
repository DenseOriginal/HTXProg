import { GenericPath } from "./paths/generic";
import { LinearPath } from "./paths/linear";

export class Enemy {
  private path: GenericPath = new LinearPath();
  private x = 0;
  private y = this.path.calculate(this.x);

  private offset = frameCount / 3;


  constructor() {
    Enemy.enemies.push(this);
  }

  draw() {
    push();

    noStroke();
    colorMode(HSB);
    fill(this.offset % 360, 360, 360);
    this.y = this.path.calculate(this.x);
    translate(this.x, height - this.y);
    rotate(-this.path.getAngle(this.x));
    square(0, 0, 50);

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