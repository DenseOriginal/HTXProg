import { Vector } from "p5";

export type CarState = 'rest' | 'drive';

export class Car {
  public state: CarState = 'rest';
  // min 5, max 10 seconds
  public timeBeforeStart: number = ((Math.random() * 5) + 1) * 1000;

  private vec = createVector();
  private acc = createVector();

  private readonly speed = Math.random() + 0.5;

  constructor(
    public pos: Vector
  ) {
    Car.cars.push(this);

    setTimeout(() => this.state = 'drive', this.timeBeforeStart);
  }

  loop() {
    this.pos.add(this.vec);
    this.vec.add(this.acc);
    this.vec.mult(0.92);
    this.acc.mult(0);

    if(this.state == 'drive') this.applyForce(createVector(this.speed, 0));

    if(this.offscreen()) this.reset();
    

    this.draw();
  }

  private draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rect(0, 0, 30, 10);

    if(this.state == 'drive') {
      noStroke();
      fill(255, 50, 50);
      rect(-15 + 2.5, 0, 5, 10);
      fill(255, 255, 50);
      rect(15 - 2.5, 0, 5, 10);
    }
    pop();
  }

  applyForce(f: Vector) {
    const forceToAdd = f.copy();
	  this.acc.add(forceToAdd);
  }

  reset() {
    this.pos.set(-10, random(0, height));
    this.state = 'rest';
    setTimeout(() => this.state = 'drive', this.timeBeforeStart);
  }

  offscreen(): boolean {
    return this.pos.x > (width + 15);
  }

  // Statics
  public static cars: Car[] = [];
}