class AudioFromLink {
  audio;

  constructor(link) {
    this.audio = new Audio(link);
  }

  start() { this.audio.currentTime = 0; this.audio.play() }
  stop() {  }
}

class AudioFromOscillator {
  osc;

  constructor(freq, type) {
    this.osc = new p5.Oscillator(freq, type);
  }

  start() { this.osc.start() }
  stop() { this.osc.stop() }
}

class Pad {
  audioSource;
  name;
  key;
  htmlButton;

  constructor(name, audioSource, key) {
    this.name = name;
    this.audioSource = audioSource;
    this.key = key;
    
    let button = document.createElement("button");
    button.innerHTML = name;
    button.style.setProperty('--color', `hsl(${Math.floor(Math.random() * 360)}, 100%, 90%)`);
    document.getElementById('container').appendChild(button);

    this.htmlButton = button;

    // Setup button listeners
    button.addEventListener('mousedown', () => this.audioSource.start());
    button.addEventListener('mouseup', () => this.audioSource.stop());

    // Setup key listeners
    document.addEventListener("keydown", (e) => { if(e.key == key) { this.audioSource.start(); button.classList.add('active') } });
    document.addEventListener("keyup", (e) => { if(e.key == key) { this.audioSource.stop(); button.classList.remove('active') } });
  }
}