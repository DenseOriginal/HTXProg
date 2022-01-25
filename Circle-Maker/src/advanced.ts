/// <reference path="../node_modules/@types/p5/global.d.ts"/>

type Point = { x: number, y: number };
const userPoints: Point[] = [{ x: 40, y: 60 }, { x: 20, y: 20 }, { x: 60, y: 0 }];

export const advanced_setup = () => {
	createCanvas(windowWidth, windowHeight);
  noLoop();
}

export const advanced_draw = () => {
  background(0);

  const [ a, b, r ] = udregnKomponenter( userPoints.reduce((acc: number[], cur) => [...acc, cur.x, cur.y], []) );

  // Arrays til top og bund punkterne, dette er så at vi kan lave en fin cirkel bagefter
	// Istede for en masse punkter
	const top: Point[] = [];
	const bottom: Point[] = [];

	// Vi behøver ikke at loope over hele canvassas
	// Fordi vi ved at en cirkel ikke er større end dens diameter
	for(let x = 0; x < width; x += 1) {
		const y1 = b+(-0.5 *((-4*x**2 )+8*a*x+4*r**2-4*a**2)**0.5 );
		top.push({ x, y: y1 }); // Tilføj punktet til listen

		const y2 = b+0.5*((-4*x**2)+8*a*x+4*r**2-4*a**2 )**0.5
		bottom.push({ x, y: y2 }); // Tilføj punktet til listen
	}

	// Loop over alle punkterne i cirklen, hvor vi starter med den øverste halvdel af punkter
	// Og bagefter den nederste halvden af punkter, men i omvendt rækkefølge
	// Fordi ellers for man en streg lige over midten af cirklen
	beginShape()
	for(const p of [...top, ...(bottom.reverse())]) {
		vertex(p.x, p.y);
	}
	endShape('close');

  push();
  strokeWeight(2);
  noFill();
  stroke(255, 100, 100);
  userPoints.forEach(p => circle(p.x, p.y, 5));
  pop();

  noLoop();
}

function udregnKomponenter(points: number[]): [number, number, number] {
  const [x, y, x_1, y_1, x_2, y_2] = points;
  const a: number=
    ((-(y_1-y)*y_2**(2))-((-1*(-y_1)**(2))+y**(2)-x_1**(2)+x**(2))*y_2-y*y_1**(2)-((-1*(-y)**(2))+x_2**(2)-x**(2))*y_1-(x_1**(2)-x_2**(2))*y)/((2*x_1-2*x)*y_2+(2*x-2*x_2)*y_1+(2*x_2-2*x_1)*y)
  const b: number =
    ((x_1 - x) * y_2 ** 2 +
      (x - x_2) * y_1 ** 2 +
      (x_2 - x_1) * y ** 2 +
      (x_1 - x) * x_2 ** 2 +
      (x ** 2 - x_1 ** 2) * x_2 +
      x * x_1 ** 2 -
      x ** 2 * x_1) /
    ((2 * x_1 - 2 * x) * y_2 +
      (2 * x - 2 * x_2) * y_1 +
      (2 * x_2 - 2 * x_1) * y);
  const r: number = sqrt((x - a) ** 2 + (y - b) ** 2);
  return [a, b, r];
}

let counter = 0;
export const advanced_click = () => {
  userPoints[counter++ % 3] = { x: mouseX, y: mouseY };
  advanced_draw();
}