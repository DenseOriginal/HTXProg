class Bold {
    xSpeed = random(-5, 5);
    ySpeed = random(-5, 5);

    constructor(
        public x: number,
        public y: number
    ) { }

    flytBold() {
        textSize(26);
        textAlign(CENTER);
        text(
            "God Weekend",
            this.x += this.xSpeed,
            this.y += this.ySpeed
        )

        if (this.x > 400 && this.x < 0) this.xSpeed *= -1;
        if (this.y > 400 && this.y < 0) this.ySpeed *= -1;
    }
}

let balls: Bold[] = Array(6).fill(new Bold(200, 200));

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0, 0, 255);
    balls.forEach(ball => ball.flytBold());
}