let balls = [];
let amountBalls = 50;

function setup() {
  createCanvas(400, 400);

  balls = Array.from({ length: amountBalls }, (_, i) => {
    return new Ball(random(0, width), random(0, height), {
      size: random(10, 40),
      dir: random([-1, 1]),
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    });
  });
}

function draw() {
  background(220);

  balls.forEach(ball => ball.step());
  balls.forEach(ball => ball.draw());
}


class Ball {
  x = 0;
  y = 0;

  speed = random(5, 15);
  minSize = 10;
  size = this.minSize;
  dir = 1;
  color = color('#ffffff');
  sizeOffset = random(0, 0.5);
  sizeMax = random(10, 50);
  sizeChange = 0;

  constructor(x_, y_, opt) {
    this.x = x_;
    this.y = y_;

    this.speed = opt.speed || this.speed;
    this.minSize = opt.size || this.minSize;
    this.dir = opt.dir || this.dir;
    this.color = opt.color || this.color
  };

  step() {
    this.x += this.speed * this.dir;
    if (this.x >= width) this.dir = -1;
    if (this.x <= 0) this.dir = 1;
    this.size = (Math.abs(sin((this.sizeChange) / 6)) * this.sizeMax) + this.minSize;
    this.sizeChange += this.sizeOffset;
  };

  draw() {
    fill(this.color)
    circle(this.x, this.y, this.size);
  };
}