const cnvWidth = 600;
const cnvHeight = 400;

let dir = 1;
let x = 0;
let speed = 5;

function setup() {
	createCanvas(cnvWidth, cnvHeight);
}

function draw() {
	// Sæt baggrunden til sort
	background(0);

	// Tegn en cirkel ved (x, halvdenlen af vinduet)
	circle(x, cnvHeight / 2, 40);

	// Ændrer x med speed
	// Gang speed med dir variablen
	// Hvis dir er posetiv bliver x større
	// Hvis dir er negativ bliver x mindre
	x += speed * dir;

	// Hvis x er mindre end nul, ændres dir til 1
	// Hvis x er i mellem 0 og width, så ændres dir ikke
	// Hvis x er mere end width, ændres dir til -1
	dir = x <= 0 ? 1 : x >= cnvWidth ? -1 : dir;
}