// Bold 1
x1 = 0;
y1 = 0;
speed1 = 1;

// Bold 2
x2 = 0;
y2 = 0;
speed2 = 2;

// Bold 3
x3 = 0;
y3 = 0;
speed3 = 3;

function setup() {
  createCanvas(400, 400);

  // Lav y-værdien tilfælfig
  // height, er højden på skærmen
  y1 = random(0, height);
  y2 = random(0, height);
  y3 = random(0, height);
}

function draw() {
  background(220);

  // Tegn alle boldene
  circle(x1, y1, 20);
  circle(x2, y2, 20);
  circle(x3, y3, 20);

  // Ryk all boldene til siden
  x1 = x1 + speed1;
  x2 = x2 + speed2;
  x3 = x3 + speed3;

  // Hvis nogle af boldene er gået ud af skærmen
  // Så skal du rykkes tilbage
  // width, er skærmens bredde
  if(x1 > width) {
    x1 = 0;
  }
  if(x2 > width) {
    x2 = 0;
  }
  if(x3 > width) {
    x3 = 0;
  }
}
