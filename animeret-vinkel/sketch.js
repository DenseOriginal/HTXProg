let curVinkel = 0;
let desiredVinkel = 450;

const radius = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  xCos = radius * cos(curVinkel);
  ySin = radius * sin(curVinkel)
  line(0, 0, xCos, -ySin);
  curVinkel += (desiredVinkel - curVinkel) / 60;
}