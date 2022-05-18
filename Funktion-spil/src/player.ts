import { Enemy, enemyRadius } from "./enemy";
import { ScoreService } from "./score.service";

const speedLimit = 10;
export const playerRadius = 10;
const healtBarPadding = 10;
const healthBarSize = 20;

export class Player {
  public health = 100;

  // Physics stuff
  private acc = 0;
  private vel = 0;
  public usePhysics = false; // Only apply physics after first space click

  public dead = false;

  private scoreService = ScoreService.Instance;

  constructor(
    public x: number,
    public y: number
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
    text('Score: ' + this.scoreService.score, healtBarPadding, height - healtBarPadding - healthBarSize - 5);


    // Click spacebar to start
    if(!this.usePhysics) {
      textAlign(RIGHT, CENTER);
      text('Press SPACEBAR to jump', this.x - playerRadius -5, this.y);
    }

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
    if(!this.usePhysics) return;
    this.acc += f;
  }

  private checkBounds() {
    if (this.y < playerRadius) { this.vel *= -1; this.y = playerRadius; }
    if (this.y > height + (playerRadius * 2)) this.scoreService.endGame();
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
          this.dead = true;
          this.scoreService.endGame();
        }
      }
    }
  }
}