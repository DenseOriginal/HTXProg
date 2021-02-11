let angle = 137.508;
let pedals = 200;
let cspread = 3;
let size = 2;
let phi;
let n = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  phi = radians(angle);
}

function draw() {
  // background(220);
  translate(width / 2, height / 2);

  for(let i = 0; i < 10; i++) {
    n++;
    let r = cspread * Math.sqrt(n);
    let theta = n * phi;
  
    let x = r * cos(theta);
    let y = r * sin(theta);
  
    strokeWeight(size);
    point(x, y);

    if(x > width / 2 || y > height / 2) noLoop();
  }
}
