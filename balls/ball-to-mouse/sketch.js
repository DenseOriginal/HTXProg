// Laver alle viriabler til bolden
ballX = 0;
ballY = 0;
ballSize = 50;

function setup() {
	// Laver et canvas på størelse med vinduet
	// Så det er fullscreen
	createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

	// Tegn bolden ved (ballX, ballY) med størelsen ballSize
  circle(ballX, ballY, ballSize);

	// Find distance mellem bolden X,Y punkter og musens X,Y punkter
	// mouseX, musens x postion
	// mouseY, musens y postion
  let deltaX = (mouseX - ballX);
  let deltaY = (mouseY - ballY);

	// Tegn en linje fra bolden til musen
	line(ballX, ballY, mouseX, mouseY);

	// Ryk en 1/10 af distancen mellem bolden og musen
	// Vi rykker 1/10 fordi sp bliver det mere smooth
	// Jo tættere på musen vi kommer, jo mindre rykker vi
  ballX += deltaX / 10;
  ballY += deltaY / 10;
}
