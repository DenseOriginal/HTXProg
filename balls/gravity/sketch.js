let m1;

function setup() {
  createCanvas(400, 400);
  m1 = new Mover(0, 100);
}

function draw() {
  background(220);
  let wind = createVector(0.01, 0);
  let gravity = createVector(0, 0.1);
  m1.applyForce(wind);
  m1.applyForce(gravity);
  m1.update();
  m1.display()
}

class Mover {
  location = createVector();
  velocity = createVector();
  acceleration = createVector();
  bouncyness = 0.1;
  mass = 10;
  size = this.mass * 2;
  c = 0.01;

  constructor(x, y) {
    this.location = createVector(x, y);
  };

  applyForce(force_) {
    let force = force_.copy();
    force.div(this.mass)
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);

    let friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(this.c);
    this.applyForce(friction);

    this.checkEdges();
  }

  display() {
    stroke(0);
    fill(175);
    circle(this.location.x, this.location.y, this.size);
  }

  checkEdges() {
    if (this.location.x + this.size/2 > width) {
      this.location.x = width - this.size/2;
      this.velocity.x *= -this.bouncyness;
    } else if (this.location.x - this.size/2 < 0) {
      this.velocity.x *= -this.bouncyness;
      this.location.x = this.size/2;
    }

    if (this.location.y + this.size/2 > height) {
      this.velocity.y *= -this.bouncyness;
      this.location.y = height - this.size/2;
    }
  }
}