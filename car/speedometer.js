class Speedometer {
    constructor(x, y, size) {
        this.x = x;
        this.y = y,
        this.size = size;
        this.speed = 110;
    }

    draw() {
        push();
        translate(this.x, this.y);

        // Draw background cirle
        noStroke();
        fill(0);
        circle(0, 0, this.size + 30);

        // Draw current speed
        textAlign(CENTER, BASELINE);
        textSize(33);
        fill(255);
        noStroke();
        text(~~this.speed, 0, 10);
        const speedTextWidth = textWidth(~~this.speed) / 2;

        // Draw km/t
        textSize(10);
        fill(255, 210, 31);
        noStroke();
        const kmTextWidth = textWidth('km/t') / 2;
        text('km/t', speedTextWidth + 5 + kmTextWidth, 10)

        rotate((PI*5)/6);
        const speedInRadians = map(this.speed, 0, 220, 0, (4*PI)/3);
        noFill();
        strokeWeight(6);
        stroke(255, 210, 31);
        arc(0, 0, this.size + 15, this.size + 15, 0, speedInRadians);

        strokeWeight(2);
        stroke(255);
        arc(0, 0, this.size, this.size, 0, (4*PI)/3);
        pop();
    }

    setSpeed(val) {
        this.speed = val;
    }
}