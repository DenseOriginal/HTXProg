import { Vector } from "p5";
import { ColorSet } from "./colors";

// Y translate
const yTrans = 45;

export class UFO {
  // Unit vector
  private direction: Vector;

  private colors = new ColorSet();

  private pos: Vector;

  private scale = random(0.5, 0.8);

  private wobbleOffset = random(0, 360);
  private wobbleSpeed = random(2, 5);

  constructor(
    public startingPoint: Vector,
    public endPoint: Vector,
    private speed: number = random(3, 7),
  ) {
    this.pos = startingPoint.copy();
    this.direction = endPoint.copy().sub(startingPoint).normalize().mult(speed);
  }

  public live(): void {
    this.move();
    this.draw();
  }

  private draw(): void {
    // // Debug stuff
    // stroke(255, 150, 150, 150);
    // line(this.pos.x, this.pos.y, this.endPoint.x, this.endPoint.y);

    // noFill();
    // strokeWeight(1.5);
    // stroke(150, 255, 150, 150);
    // circle(this.pos.x, this.pos.y, 50 * 2 * this.scale);

    push();

    translate(this.pos.x, this.pos.y);
    scale(this.scale);

    // Add a little bit of wobble
    rotate(sin(this.wobbleOffset + frameCount * this.wobbleSpeed) * 5);

    stroke(40, 150);

    // Dome
    fill(this.colors.domeColor);
    arc(0, 30 - yTrans, 40, 40, 180, 0);

    // Upper shell
	  fill(this.colors.shellColor);
    arc(0, 40 - yTrans, 100, 40, 180, 0);

    // Lower shell
	  fill(this.colors.shellColorDark);
    ellipse(0, 40 - yTrans, 100, 10);

    // Light underneath
	  noStroke();
    fill(this.colors.lightsColor);
	  quad(-15, 43 - yTrans, 15, 43 - yTrans, 25, 85 - yTrans, -25, 85 - yTrans)
	  arc(0, 43 - yTrans, 30, 7, 180, 0)

    pop();
  }

  private move(): void {
    this.pos.y += sin(this.wobbleOffset + frameCount * this.wobbleSpeed) * 2;
    this.pos.add(this.direction);
  }

  public isToTheRightOfScreen(): boolean {
    return this.pos.x - (50 * 2 * this.scale) > width;
  }
}