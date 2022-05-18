const speedLimit = 10;
const radius = 10;

export class Player {
  private y = 0;

  // Physics stuff
  private acc = 0;
  private vel = 0;

  constructor(
    private x: number
  ) { }

  draw() {
    push();
    noStroke();
    fill(0);
    circle(this.x, this.y, radius * 2);
    pop();

    this.y += this.vel;
    this.vel = Math.min(this.vel + this.acc, speedLimit);
    this.vel *= 0.95;
    this.acc = 0;
    this.checkBounds();
  }

  applyForce(f: number): void {
    this.acc += f;
  }

  private checkBounds() {
    if (this.y < radius) { this.vel *= -1; this.y = radius; }
  }
}