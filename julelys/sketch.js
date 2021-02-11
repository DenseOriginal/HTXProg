// Højden af en kasse
let rectHeight = 20;
// Hvor meget større bredden skal blive for hver dag
let widthIncrement = 2;
// Den mindste bredde til kasserne
// Kasse nr. 1 vil altid have denne bredde
// Fordi der ikke bliver lagt noget ekstra til
let minWidth = 40;

// Flammes højde
let flameHeight = 30;
// flameWiggle, denne variable bliver tildelt en værdi i draw()
// Vi giver den ikke en værdi til at starte med
// Fordi den alligevel bliver overskrevet
// Derfor definere vi blot variablen, for at sige at den findes.
let flameWiggle;

function setup() {
  // Lave en canvas på størelse med skærmen
  // Dette betyder at vores canvas kommer til at fylde hele skærme
  createCanvas(windowWidth, windowHeight);

  // Dette gør så vi tegner kasse ved blot at sige hvor midten er
  // Og hvad højde og bredde er
  // Så regner den selv ud hvordan den skal tegnes
  // Dette gøre vi fordi at bliver lette at tegne ting i midten
  rectMode(CENTER);

  // Vi ændrer også på hvordan teksten skal tegnes
  // Så kun siger hvor midten af teksten skal være
  // Så bliver det også lettere at centrere teksten på midten af kassen
  textAlign(CENTER, CENTER);
}

function draw() {
  background(160, 150, 150);
  stroke(255);

  // Vi ændrer nul-punktet hvor fra alt skal tegnes
  // til toppen af skærmen på midten
  // Dette gør blot at vi ikke behøver at tænke på X-værdier
  // Så alle ting der bliver tegnet, har en X-værdi på 0
  translate(width / 2, 0);

  // Hvor meget skal vi rykke kasserne nedad før de rammer bunden?
  let heightOffset = height - (rectHeight * 24) + rectHeight / 2;
  
  // Istedet for at vente 1 dag for at se nogen forskel
  // Så sætter vi currDay variablen til sekunder
  let currDay = new Date().getSeconds();
  // Fordi sekunder går fra 0-60 så laver vi den om til 0-24
  // Så det passer med hvis det var dage vi talte
  // ~~ betyder at vi fjerner alle decimaler
  // Hvis vi ikke have gjort dette så ville vi får en masse tal
  // Som vi ikke skal bruge til noget
  currDay = ~~map(currDay, 0, 60, 0, 24);

  // Regn Flammens højde ud
  // Flammen skal sidde over den øverste kasse
  let flameY = currDay * rectHeight + heightOffset - flameHeight;

  // Wig
  // Tegn en linje fra bunden af skærmen til flammens midte
  // Linjen burde egenligt kun tegnes fra toppen af lyset
  // Men fordi kasserne og flammen bliver tegnet over linjen
  // Så er det ikke nødvendigt at tegne den præcist fra hvor den start og slutter
  line(0, flameY, 0, height);

  // Flame
  noStroke();
  fill(250, 218, 60);

  // Regn ud hvor meget flammen skal bevæge sig
  // Denne værdi findes ved hjælp af en sinus kurve
  // Så flammen bevæger sig på en pæn animeret måde
  flameWiggle = sin(frameCount / 5);
  // Tegn flammen som en ellipse hvor højden er større en bredden
  // Flammens y værdi er flameY + flameWiggle, 
  // Fordi at så bevæger flammen sig op og ned
  // Flammens højde er flameHeight - flameWiggle
  // Fordi bevæger bunden af flammen sig ikke, og er altid på samme sted
  ellipse(0, flameY + flameWiggle, 10, flameHeight - flameWiggle);

  // Candle
  // Vi ved at vi maks skal bruge 24 kasser
  // Men vi skal kun bruge dem som er større en dagen vi har idag
  // Dette gør vi ved at starte for-loopet ved den dag vi har idag
  for (let i = currDay; i < 24; i++) {
    // Starter med at regne kassens Y-pos ud
    // Fordi at den værdi bliver brugt flere gang
    let rectY = (i * rectHeight) + heightOffset;
    fill(255);
    stroke(255);
    // Vi tegner kassen ved 0 på X-aksen
    // Fordi at vi har sat midten af skærmen til 0 på X-aksen
    // Kassens bredde er mindste bredden, plus hvad end vi skal ligge til
    rect(0, rectY, minWidth + (i * widthIncrement), rectHeight);

    fill(0);
    // Så laver vi teksten som skal tegnes lige i midten af kasse
    // Vi skal huske at i går fra 0-23 så vi skal ligge 1 til
    // For at få den rigtige værdi
    text(i + 1, 0, rectY);
  }
}