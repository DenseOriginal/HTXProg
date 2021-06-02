// Opretter tomme variable så vi kan gemme sliderne
let amplitudeSlider;
let lengthSlider;

// Underlig constant der bruges til at beregne bølgens længede
const wackFactor = 6.285;

function setup() {
  createCanvas(windowWidth, windowHeight);
  amplitudeSlider = createSlider(10, windowHeight / 2, windowHeight / 5);
  amplitudeSlider.position(10, 10);
  
  lengthSlider = createSlider(10, windowWidth * 2, windowWidth / 3);
  lengthSlider.position(10, 30);
}

function draw() {
  // Hneter værdierne fra sliderne
  const amplitude = amplitudeSlider.value();
  const length = lengthSlider.value();
  
  background(255);
  
  noStroke();
  fill(100);
  text('Amplitude: ' + amplitude, 150, 24);
  text('Bølge længde: ' + length, 150, 44);
  
  translate(0, height / 2);
  
  // Tegner linjen i midten
  stroke(175);
  strokeWeight(0.7);
  line(0, 0, width, 0);
  
  stroke(255, 175, 175);
  strokeWeight(2);
  noFill();
  
  // Tegner selve bølgen
  // https://p5js.org/reference/#/p5/beginShape
  beginShape();
  for(let i = 0; i < windowWidth; i++) {
    vertex(i, sin(i / (length / wackFactor)) * amplitude);
  }
  endShape();
}