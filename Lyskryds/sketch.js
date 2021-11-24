// RED             : 00
// RED TO GREEN    : 01
// GREEN           : 10
// GREEN TO RED    : 11

const RAM = [
  0b1000,
  0b1000,
  0b1100,
  0b0000,
  0b0001,
  0b0010,
  0b0010,
  0b0011,
  0b0000,
  0b0100
];

let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);
}

function draw() {
  background(0);

  const instruction = RAM[counter];
  const firstLight = (instruction & 0b1100) >> 2;
  const lastLight = instruction & 0b0011;

  noStroke();

  //  First light
  // First dot
  fill(firstLight == 0 || firstLight == 1 ? '#ff0000' : '#fff0');
  circle(100, 100, 20);

  // Second dot
  fill(firstLight == 1 || firstLight == 3 ? '#ffff00' : '#fff0');
  circle(125, 100, 20);

  // Third dot
  fill(firstLight == 2 ? '#00ff00' : '#fff0');
  circle(150, 100, 20);

  //  last light
  // First dot
  fill(lastLight == 0 || lastLight == 1 ? '#ff0000' : '#fff0');
  circle(100, 125, 20);

  // Second dot
  fill(lastLight == 1 || lastLight == 3 ? '#ffff00' : '#fff0');
  circle(125, 125, 20);

  // Third dot
  fill(lastLight == 2 ? '#00ff00' : '#fff0');
  circle(150, 125, 20);

  counter = (counter + 1) % RAM.length;
}