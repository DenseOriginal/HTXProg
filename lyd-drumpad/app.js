const sounds = {
  1: audioFromLink("./sounds/fuck-din-far.mp3"),
  2: audioFromLink("./sounds/fuck-din-mor.mp3"),
  " ": audioFromLink("./sounds/boom.mp3"),
  4: audioFromLink("./sounds/meow.mp3"),
  // 5: audioFromLink("./sounds/pornhub.mp3"),
  6: audioFromLink("./sounds/minecraft-villager.mp3"),
  7: audioFromLink("./sounds/bababooey.mp3"),
  "ArrowRight": audioFromLink("./sounds/bruh.mp3"),
  9: audioFromLink("./sounds/sans.mp3"),
  "ArrowLeft": audioFromOscillator(440, 'sine'),
};

const audioSources = {};

// Loop over all the sound and create an audio element for that sound, then add it to the DOM
for (let key in sounds) {
  // Create a button with the sound name and add it to the .container div
  let button = document.createElement("button");
  button.dataset.soundkey = key;
  button.innerHTML = sounds[key].name;
  document.getElementById('container').appendChild(button);

  // Give all the buttons a random pastel color
  button.style.setProperty('--color', `hsl(${Math.floor(Math.random() * 360)}, 100%, 90%)`);
}


// Listen for keyboard events, and play the sound when the key is pressed, using the playSound function
document.addEventListener("keydown", function(event) {
  console.log(event.key);
  playSound(event.key);
  const button = document.querySelector(`button[data-soundkey="${event.key}"]`);
  if(!button) return;
  button.classList.add('active');
});

// Remove active class from all buttons when a key is released
document.addEventListener("keyup", function(event) {
  stopSound(event.key);
  const button = document.querySelector(`button[data-soundkey="${event.key}"]`);
  if(!button) return;
  button.classList.remove('active');
});

// Loop over all buttons and add and event listener to each one
// When a button is clicked, play the sound associated with the button
document.querySelectorAll('button').forEach(function(button) {
  button.addEventListener('mousedown', function() {
    playSound(button.dataset.soundkey);
  });
});

// Function to take in a key and play the sound
function playSound(key) {
  let audio = sounds[key];
  if(!audio) return;
  audio.start();
}

// Function to take in a key and stop the sound
function stopSound(key) {
  let audio = sounds[key];
  if(!audio) return;
  audio.stop();
}

function audioFromLink(link) {
  let audio = document.createElement("audio");
  audio.setAttribute("src", link);
  document.body.appendChild(audio);

  return {
    start: () => { audio.currentTime = 0; audio.play(); },
    stop: () => {},
    name: link.slice(9, -4).replaceAll('-', ' '),
  }
}

function audioFromOscillator(freq, type) {
  const osc = new p5.Oscillator(freq, type);

  return {
    start: () => osc.start(),
    stop: () => osc.stop(),
    name: `${type} ${freq} Hz`,
  };
}