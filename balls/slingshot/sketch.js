let ball;
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball();
  gravity = createVector(0, 0.5);
}

function draw() {
  background(220);
  ball.applyForce(gravity);
  ball.update();
  ball.display();

  if (mouseIsPressed) {
    let newVectorX = mouseX - ball.pos.x;
    let newVectorY = mouseY - ball.pos.y;
    let newVector = createVector(newVectorX, newVectorY);
    newVector.div(100);

    ball.applyForce(newVector);
  }
}

class Ball {
  pos = createVector(width / 2, height / 2);
  velocity = createVector(0, 0);
  acceleration = createVector(0, 0);

  radius = 10;
  bouncyness = 0.2;

  constructor() { }

  applyForce(f) {
    let newForce = f.copy();
    this.acceleration.add(newForce);
  }

  update() {
    this.checkEdges();
    this.velocity.add(this.acceleration);
    this.velocity.mult(0.99)
    this.pos.add(this.velocity);
    this.acceleration.mult(0);

    this.pos.set(
      constrain(this.pos.x, this.radius, width - this.radius),
      constrain(this.pos.y, -Infinity, height - this.radius)
    );
  }

  display() {
    stroke(0);
    strokeWeight(1);
    circle(this.pos.x, this.pos.y, this.radius * 2);

    if (this.pos.y < -this.radius) {
      stroke(255, 100, 100);
      strokeWeight(3);
      line(this.pos.x, 5, this.pos.x, 25);
    }
  }

  checkEdges() {
    if (this.pos.x - this.radius <= 0 || this.pos.x >= width - this.radius) {
      this.velocity.x *= -this.bouncyness;
    }

    if (this.pos.y >= height - this.radius) {
      this.velocity.y *= -this.bouncyness;
    }
  }
}