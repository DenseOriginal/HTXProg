let unitSize = 30;
let unitCircleDiameter = 0;
let unitCircleRadius = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  unitCircleDiameter = ~~(Math.min(width, height) * .7 / (unitSize * 2)) * (unitSize * 2);
  unitCircleRadius = unitCircleDiameter / 2;
  angleMode(DEGREES);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // Draw grid lines
  gridLines();

  // Draw unit circle
  noFill();
  stroke(100);
  strokeWeight(1.2);
  circle(0, 0, unitCircleDiameter);

  // Draw numbers
  push();

  textAlign(CENTER, CENTER);
  strokeWeight(0.5);
  fill(100);
  textSize(20);
  text('1', unitCircleRadius + unitSize / 2, 0);
  text('-1', 0, unitCircleRadius + unitSize / 2);
  text('-1', -(unitCircleRadius + unitSize / 2), 0);
  text('1', 0, -(unitCircleRadius + unitSize / 2));

  pop();

  // Get rotation
  let realAngle = atan2(mouseY - height / 2, mouseX - width / 2);
  let a = realAngle < 0 ? realAngle * -1 : map(realAngle, 180, 0, 180, 360);
  fill(175, 175, 255, 100);
  stroke(175, 175, 255, 200);
  strokeWeight(2);
  arc(0, 0, unitSize * 2, unitSize * 2, realAngle, 0, PIE);

  // Draw angle text
  noStroke();
  fill(0);
  text(`V = ${a.toFixed(3)}`, unitSize * 1.3, -unitSize * 1.3);

  // Draw angle line
  stroke(100);
  strokeWeight(1.2);
  push();
  rotate(realAngle);
  line(0, 0, unitCircleRadius, 0);
  pop();

  // Draw sinus line
  strokeWeight(2);
  stroke(175, 255, 175);
  const sinLine = sin(realAngle) * unitCircleRadius;
  line(0, 0, 0, sinLine);
  strokeWeight(2.5);
  cross(0, sinLine, 5);

  // Draw cosinus line
  strokeWeight(2);
  stroke(255, 175, 175);
  const cosLine = cos(a) * unitCircleRadius;
  line(0, 0, cosLine, 0);
  strokeWeight(2.5);
  cross(cosLine, 0, 5);

  // Draw tangent line
  stroke(160);
  strokeWeight(1);
  const [tanX, tanY] = [unitCircleRadius, -tan(a) * unitCircleRadius];
  line(tanX, -height, tanX, height);
  stroke(255, 173, 51);
  strokeWeight(2);
  cross(tanX, tanY, 5);

  // Draw cosinus, sinus ang tangent text
  noStroke();
  fill(0);
  text(`sin = ${sin(a).toFixed(3)}`, unitSize, sinLine / 2);
  text(`cos = ${cos(a).toFixed(3)}`, cosLine / 2, unitSize);
  text(`tan = ${tan(a).toFixed(3)}`, tanX + unitSize, constrain(tanY, -height / 2 + unitSize, height / 2 - unitSize));
}

function gridLines() {
  stroke(0, 30);
  strokeWeight(1);
  for(let x = 0; x < width / 2; x += unitSize) {
    line(x, -height / 2, x, height / 2);
  }
  for(let y = 0; y < height / 2; y += unitSize) {
    line(-width / 2, y, width / 2, y);
  }
  for(let x = 0; x > -width / 2; x -= unitSize) {
    line(x, -height / 2, x, height / 2);
  }
  for(let y = 0; y > -height / 2; y -= unitSize) {
    line(-width / 2, y, width / 2, y);
  }
}

function cross(x, y, size) {
  push();
  translate(x, y);
  line(-size, -size, size, size);
  line(-size, size, size, -size);
  pop();
}