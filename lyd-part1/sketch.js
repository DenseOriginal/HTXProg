let rainSound;
let x = 0;
const minRate = 0.1;
const maxRate = 4;

function preload() {
  rainSound = loadSound('rain.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rainSound.loop(0, minRate, 1);
}

function draw() {
  background(255);

  x = (x + 1) % width;
  const rate = (x / width) * (maxRate - minRate) + minRate;

  circle(x, 10, 10);

  rainSound.rate(rate);
}