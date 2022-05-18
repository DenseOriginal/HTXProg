export class ScoreService {
  private _score: number = 0;
  public get score(): number { return this._score; }

  private get highscore(): number {
    return parseInt(localStorage.getItem('fngame-highscore') || '0');
  }

  private set highscore(score: number) {
    localStorage.setItem('fngame-highscore', score.toString());
  }

  private constructor() { }

  increment(n: number) { this._score += n }
  decrement(n: number) { this._score -= n }

  endGame() {
    if (this.highscore < this._score) this.highscore = this._score;

    document.getElementById('game-over')?.removeAttribute('hidden');
    (document.getElementById('score') as any).innerText = this._score;
    (document.getElementById('highscore') as any).innerText = this.highscore;
    noCanvas();
    noLoop();
  }

  // Singleton stuff
  private static singletonInstance?: ScoreService;
  public static get Instance(): ScoreService {
    // If the class hasn't been instantiated, then do it
    if (!this.singletonInstance) this.singletonInstance = new this();
    return this.singletonInstance;
  }
}