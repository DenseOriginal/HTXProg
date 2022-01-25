/// <reference path="../node_modules/@types/p5/global.d.ts"/>
import { advanced_click, advanced_draw, advanced_setup } from "./advanced";
import { basic_draw, basic_setup } from "./basic";

let state: 'basic' | 'advanced' = 'basic';

(window as any).setup = () => {
  state == 'basic' ? basic_setup() : advanced_setup();
}

(window as any).draw = () => {
  state == 'basic' ? basic_draw() : advanced_draw();
}

(window as any).mousePressed = () => {
  state == 'basic' ? {} : advanced_click();
}

document.getElementById('switch')?.addEventListener('click', () => {
  state = state == 'basic' ? 'advanced' : 'basic';
  loop();
});