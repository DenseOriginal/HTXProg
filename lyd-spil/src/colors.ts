import { Color } from "p5";

export class ColorSet {
  public shellColor: Color = randomPastelColor();
  public shellColorDark: Color = lerpColor(this.shellColor, color(0), 0.1);
  public domeColor: Color = randomPastelColor();
  public lightsColor: Color = randomPastelColor();

  constructor() {
    this.lightsColor.setAlpha(175);
  }
}

function randomPastelColor(): Color {
  return color(
    random(140, 255),
    random(140, 255),
    random(140, 255),
  );
}