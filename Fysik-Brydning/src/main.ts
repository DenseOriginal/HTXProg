/// <reference path="../node_modules/@types/p5/global.d.ts"/>

let waterSurface: number = 0;
let criticalVinkel = 0;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
    waterSurface = height / 2;
    angleMode(DEGREES);
}

const upper = document.getElementById('upper') as HTMLInputElement;
const lower = document.getElementById('lower') as HTMLInputElement;

(window as any).draw = () => {
    const uppperBrydning = parseFloat(upper.value || "2");
    const lowerBrydning = parseFloat(lower.value || "1.33");
    criticalVinkel = asin(lowerBrydning / uppperBrydning);

    background(255);

    // Draw water surface line
    strokeWeight(1);
    stroke(0);
    line(0, waterSurface, width, waterSurface);

    // Draw water color
    noStroke();
    fill(50, 50, 255, 50);
    rect(0, waterSurface, width, height);

    // Calculate laser
    const straightVector = createVector(1, 0);
    const mouseVector = createVector(mouseX, mouseY);
    const angle = straightVector.angleBetween(mouseVector);
    const laserLength = waterSurface / sin(angle);
    const laserX = cos(angle) * laserLength;
    const laserY = sin(angle) * laserLength;
    const indfaldsVinkel = 180 - 90 - angle;
    const waterIntersectX = waterSurface / tan(angle);

    // Draw laser
    strokeWeight(3);
    stroke(255, 100, 100);
    line(0, 0, laserX, laserY);

    // Calculate new laser path
    const brydningVinkel = 90 - asin( ( sin(indfaldsVinkel) * uppperBrydning ) / lowerBrydning );
    const newAngle = indfaldsVinkel > criticalVinkel ? -90 + indfaldsVinkel : brydningVinkel;
    
    const newLaserX = cos(newAngle) * width + waterIntersectX;
    const newLaserY = sin(newAngle) * width + waterSurface;

    // Draw new laser path
    strokeWeight(3);
    stroke(255, 100, 100);
    line(waterIntersectX, waterSurface, newLaserX, newLaserY);

    // Random debug
    noStroke();
    fill(0);
    strokeWeight(0);
    text("indfaldsVinkel: " + indfaldsVinkel.toFixed(2), 10, 200);
    text("criticalVinkel: " + criticalVinkel.toFixed(2), 10, 210);
    text("brydningVinkel: " + brydningVinkel.toFixed(2), 10, 220);
    text("angle: " + angle.toFixed(2), 10, 230);
}
