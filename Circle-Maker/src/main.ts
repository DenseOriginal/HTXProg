/// <reference path="../node_modules/@types/p5/global.d.ts"/>

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
}

(window as any).draw = () => {
	background(0);

	stroke('white');
	strokeWeight(2);
	minCirkel(200, 250, 50, 0.01);

	noLoop();
}

type Point = { x: number, y: number };
function minCirkel(cX: number, cY: number, r: number, resolution = 1): void {
	// Arrays til top og bund punkterne, dette er så at vi kan lave en fin cirkel bagefter
	// Istede for en masse punkter
	const top: Point[] = [];
	const bottom: Point[] = [];

	// Vi behøver ikke at loope over hele canvassas
	// Fordi vi ved at en cirkel ikke er større end dens diameter
	for(let x = cX - r; x < cX + r; x += resolution) {
		// Koefficienter
		const a = 1;  // A er lidt ligemeget i dette tilfælde fordi den er 1
		const b = 2 * cY;
		const c = x**2 + cX**2 - 2 * x * cX + cY**2 - r**2;
		const D = b**2 - 4 * a * c;

		// Hvis D  er mindre end nul så er der ikke nogen løsninger
		// derfor kan vi bare skippe til næste iteration
		if(D < 0) continue;

		const y1 = (b + sqrt(D)) / 2;
		top.push({ x, y: y1 }); // Tilføj punktet til listen

		const y2 = (b - sqrt(D)) / 2;
		top.push({ x, y: y2 }); // Tilføj punktet til listen
	}

	// Loop over alle punkterne i cirklen, hvor vi starter med den øverste halvdel af punkter
	// Og bagefter den nederste halvden af punkter, men i omvendt rækkefølge
	// Fordi ellers for man en streg lige over midten af cirklen
	beginShape()
	for(const p of [...top, ...(bottom.reverse())]) {
		vertex(p.x, p.y);
	}
	endShape();
}