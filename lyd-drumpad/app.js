const sounds = {
  1: "./sounds/fuck-din-far.mp3",
  2: "./sounds/fuck-din-mor.mp3",
  3: "./sounds/boom.mp3",
  4: "./sounds/meow.mp3",
  5: "./sounds/pornhub.mp3",
  6: "./sounds/minecraft-villager.mp3",
  7: "./sounds/bababooey.mp3",
  8: "./sounds/bruh.mp3",
  9: "./sounds/sans.mp3",
};

// Loop over all the sound and create an audio element for that sound, then add it to the DOM
for (let key in sounds) {
  let audio = document.createElement("audio");
  audio.setAttribute("id", key);
  audio.setAttribute("src", sounds[key]);
  document.body.appendChild(audio);

  // Create a button with the sound name and add it to the .container div
  let button = document.createElement("button");
  button.dataset.soundkey = key;
  button.innerHTML = sounds[key].slice(9, -4).replaceAll('-', ' ');
  document.getElementById('container').appendChild(button);

  // Give all the buttons a random pastel color
  button.style.setProperty('--color', `hsl(${Math.floor(Math.random() * 360)}, 100%, 90%)`);
}


// Listen for keyboard events, and play the sound when the key is pressed, using the playSound function
document.addEventListener("keydown", function(event) {
  playSound(event.key);
  const button = document.querySelector(`button[data-soundkey="${event.key}"]`);
  if(!button) return;
  button.classList.add('active');
});

// Remove active class from all buttons when a key is released
document.addEventListener("keyup", function(event) {
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
  let audio = document.getElementById(key);
  if(!audio) return;
  audio.currentTime = 0;
  audio.play();
}