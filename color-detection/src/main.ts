/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import p5 from "p5";

let capture: any;
const stepSize = 1;

const dR = 255;
const dG = 0;
const dB = 0;
let slider: any;

const mult = 1.5;
const wii = 640 * mult;
const hee = 480 * mult;

(window as any).setup = () => {
	createCanvas(wii, hee);
	slider = createSlider(0, 255, 100);

  // specify multiple formats for different browsers
  capture = createCapture(VIDEO);
  capture.size(wii, hee);
  capture.hide();
  noStroke();
  fill(0);
	console.log(slider);
	
}

(window as any).draw = () => {
	background(255);
  capture.loadPixels();
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      let i = (x + y * width) * 4;
      const r = (capture.pixels[i]);
      const g = (capture.pixels[i + 1]);
      const b = (capture.pixels[i + 2]);
			
			const distSq = (dR - r) ** 2 + (dG - g) ** 2 + (dB - b) ** 2;
			const dist = sqrt(distSq);
			
			if (dist < slider.value()) {
				fill(r, g, b)
				rect(x, y, stepSize, stepSize);	
			}
    }
  }

	text(slider.value(), 10, 10);
}
