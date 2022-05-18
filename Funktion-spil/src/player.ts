import { Enemy, enemyRadius } from "./enemy";

const speedLimit = 10;
export const playerRadius = 10;
const healtBarPadding = 10;
const healthBarSize = 20;

export class Player {
  public y = 0;

  public health = 100;

  // Physics stuff
  private acc = 0;
  private vel = 0;

  public dead = false;

  public score = 0;

  constructor(
    public x: number
  ) { }

  draw() {
    push();
    noStroke();
    fill(0);
    circle(this.x, this.y, playerRadius * 2);

    // Healthbar
    rectMode(CORNER)
    fill(0, 2);
    rect(healtBarPadding, height - healtBarPadding - healthBarSize, width - (healtBarPadding * 2), healthBarSize);

    fill(255, 100, 100);
    rect(healtBarPadding, height - healtBarPadding - healthBarSize, (width - (healtBarPadding * 2)) * (this.health / 100), healthBarSize);
    
    // Score
    fill(0);
    textAlign(LEFT, BOTTOM);
    text('Score: ' + this.score, healtBarPadding, height - healtBarPadding - healthBarSize - 5);

    pop();


    // Regenerate
    if (this.health < 100 && this.health > 0) this.health = min(100, this.health + 0.008);

    this.y += this.vel;
    this.vel = Math.min(this.vel + this.acc, speedLimit);
    this.vel *= 0.95;
    this.acc = 0;
    this.checkBounds();
  }

  applyForce(f: number): void {
    this.acc += f;
  }

  private checkBounds() {
    if (this.y < playerRadius) { this.vel *= -1; this.y = playerRadius; }
    if (this.y > height - playerRadius) { this.vel *= -0.7; this.y = height - playerRadius; }
  }

  checkCollision(enemies: Enemy[]): void {
    const minDistSq = sq(playerRadius + enemyRadius);

    for(const enemy of enemies) {
      // line(this.x, this.y, enemy.x, height - enemy.y); // Debug
      const distToEnemySq = sq(this.x - enemy.x) + sq(this.y - (height - enemy.y))
      if(distToEnemySq < minDistSq) {
        enemy.colide();

        const shakeElement = document.body;
        shakeElement?.classList.remove('shake');
        void shakeElement?.offsetWidth; // Funky trick to allow the screen shake
        shakeElement?.classList.add('shake');

        this.health -= 20;
        if (this.health < 0) {
          this.health = 0;
          document.getElementById('game-over')?.removeAttribute('hidden');
          (document.getElementById('score') as any).innerText = this.score;
          this.dead = true;
          noCanvas();
          noLoop();
        }
      }
    }
  }
}