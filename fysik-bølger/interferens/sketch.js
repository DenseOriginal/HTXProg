// Opretter tomme variable så vi kan gemme sliderne
let amplitudeSlider1;
let lengthSlider1;

let amplitudeSlider2;
let lengthSlider2;
let offsetSlider2;

// Generelle værdier
const color1 = "#ffafaf";
const color2 = "#afffaf";
const colorMix = "#afafff";

// Underlig constant der bruges til at beregne bølgens længede
const wackFactor = 6.285;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Slider set 1
  amplitudeSlider1 = createSlider(-windowHeight / 2, windowHeight / 2, windowHeight / 5);
  amplitudeSlider1.position(10, 10);
  lengthSlider1 = createSlider(10, windowWidth * 2, windowWidth / 3);
  lengthSlider1.position(10, 30);
  
  // Slider set 2
  amplitudeSlider2 = createSlider(-windowHeight / 2, windowHeight / 2, windowHeight / 5);
  amplitudeSlider2.position(260, 10);
  lengthSlider2 = createSlider(10, windowWidth * 2, windowWidth / 3);
  lengthSlider2.position(260, 30);
  offsetSlider2 = createSlider(0, windowWidth / 2, 0);
  offsetSlider2.position(260, 50);
}

function draw() {
  // Hneter værdierne fra sliderne
  const amplitude1 = amplitudeSlider1.value();
  const length1 = lengthSlider1.value();
  
  const amplitude2 = amplitudeSlider2.value();
  const length2 = lengthSlider2.value();
  const offset2 = offsetSlider2.value();
  
  background(255);
  
  noStroke();
  fill(100);
  text('Rød bølge', 12, 10)
  text('Amplitude: ' + amplitude1, 150, 24);
  text('Bølge længde: ' + length1, 150, 44);
  
  text('Grøn bølge', 262, 10)
  text('Amplitude: ' + amplitude2, 400, 24);
  text('Bølge længde: ' + length2, 400, 44);
  text('Forskydning: ' + offset2, 400, 64);
  
  translate(0, height / 2);
  
  // Tegner linjen i midten
  stroke(175);
  strokeWeight(0.7);
  line(0, 0, width, 0);
  
  strokeWeight(2);
  noFill();
  
  // Tegner selve bølgerne
  // https://p5js.org/reference/#/p5/beginShape
  
  // Bølge 1
  stroke(color1);
  beginShape();
  for(let i = 0; i < windowWidth; i++) {
    vertex(i, sin(i / (length1 / wackFactor)) * amplitude1);
  }
  endShape();
  
  // Bølge 2
  stroke(color2);
  beginShape();
  for(let i = 0; i < windowWidth; i++) {
    vertex(i, sin(i / (length2 / wackFactor) + offset2) * amplitude2);
  }
  endShape();
  
  // Bølge 3
  stroke(colorMix);
  beginShape();
  for(let i = 0; i < windowWidth; i++) {
    const wave1 = sin(i / (length1 / wackFactor)) * amplitude1;
    const wave2 = sin(i / (length2 / wackFactor) + offset2) * amplitude2;
    vertex(i, wave1 + wave2);
  }
  endShape();
}