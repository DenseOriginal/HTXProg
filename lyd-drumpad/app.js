document.addEventListener('contextmenu', (e) => e.preventDefault())

new Pad('Fuck din far', new AudioFromLink("./sounds/fuck-din-far.mp3"), 1);
new Pad('Fuck din mor', new AudioFromLink("./sounds/fuck-din-mor.mp3"), 2);
new Pad('Boom', new AudioFromLink("./sounds/boom.mp3"), 3);
new Pad('Cat', new AudioFromLink("./sounds/meow.mp3"), 4);
new Pad('Pornhub', new AudioFromLink("./sounds/pornhub.mp3"), 5);
new Pad('Minecraft villager', new AudioFromLink("./sounds/minecraft-villager.mp3"), 6);
new Pad('Bababooey', new AudioFromLink("./sounds/bababooey.mp3"), 7);
new Pad('Bruh', new AudioFromLink("./sounds/bruh.mp3"), 9);
new Pad('Sans', new AudioFromLink("./sounds/sans.mp3"), 0);
new Pad('Sine 440 hz', new AudioFromOscillator(440, 'sine'), 'a');