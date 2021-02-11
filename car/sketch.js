let mainBil;
let sHeight = 50;
let speed = 1;
let speedOfset = 0;
let roadWidth = 200;
let speedometer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  mainBil = new Bil(0, height - 55, 25, 50);
  speedometer = new Speedometer(120, height - 120, 200);
}

function draw() {
  background(40, 230, 40);
  translate(width / 2, 0);

  // Ambient
  fill(175);
  rect(0, height / 2, roadWidth, height);
  fill(255);
  // Draw road stripes
  speedOfset += speed;
  for (let i = -(sHeight); i < height + (sHeight); i += sHeight) {
    rect(0, i + speedOfset % sHeight, 5, sHeight / 2);
  }

  mainBil.update();
  mainBil.show();

  if (keysDown.has('w')) speed += 0.03;
  if (keysDown.has('s')) speed = Math.max(speed - 0.03, 0);
  speed *= mainBil.isOutideRoad ? 0.95 : 0.9993;
  speed = constrain(speed, 0, 20);

  // Drawing GUI
  translate(-(width / 2), 0);
  speedometer.setSpeed(map(speed / 2, 0, 10, 0, 220));
  speedometer.draw();
}

// Key shit
const keysDown = new Set();
document.addEventListener('keydown', (event) => keysDown.add(event.key.toLowerCase()));
document.addEventListener('keyup', (event) => keysDown.delete(event.key.toLowerCase()));

class Bil {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isOutideRoad = false;

    // Posetive = right
    // Negative = left
    this.xSpeed = 0;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.xSpeed = 0;
    if (keysDown.has('a')) { this.xSpeed = -4; }
    if (keysDown.has('d')) { this.xSpeed = 4; }

    // If car is on grass then slow speed
    this.isOutideRoad = Math.abs(this.x) > roadWidth / 2;
    if (this.isOutideRoad) this.xSpeed *= 0.25;

    // Prevent car from moveing outside canvas
    this.x = constrain(this.x + this.xSpeed, -(width / 2), width / 2);
  }
}