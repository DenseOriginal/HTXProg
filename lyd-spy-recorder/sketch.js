let mic, recorder, soundFile;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

  noLoop();
}

function draw() {
  background(220);

  if(frameCount == 10) recorder.record(soundFile, Infinity, () => {
    save(soundFile, `${Math.random().toString().slice(2)}.wav`);
  });

  setTimeout(() => {
    recorder.stop();
    noLoop();
  }, 2000);
}

function mousePressed() {
  // ensure audio is enabled
  userStartAudio();

  if(mic.enabled) loop();
}

// let mic, recorder, soundFile;
// let recording = false;
// let lastRecording = false;
// const threshold = 0.06;
// const lowerThreshold = 0.05;
// let stopAt = undefined;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
  
//   // create an audio in
//   mic = new p5.AudioIn();

//   // prompts user to enable their browser mic
//   mic.start();

//   setupRecord();

//   noLoop();
// }

// function draw() {
//   background(220);

//   if(mic.getLevel() > threshold) {
//     recording = true;
//   }

//   if(recording) {
//     fill(255, 0, 0);
//     circle(15, 15, 10);

//     if(!lastRecording) {
//       recorder.record(soundFile, Infinity, () => {
//         save(soundFile, `${Math.random().toString().slice(2)}.wav`);
//         setupRecord();
//       });
//     }
//   }

//   if(mic.getLevel() < lowerThreshold && recording && !stopAt) {
//     stopAt = millis() + 20;
//   }

//   if(stopAt < millis()) {
//     if(mic.getLevel() < lowerThreshold) {
//       recorder.stop();
//       stopAt = undefined;
//       recording = false;

//       noLoop();

//       setTimeout(() => {
//         loop()
//       }, 6000);
//     }
//   }

//   if(mic.getLevel() > lowerThreshold) {
//     stopAt = undefined;
//   }

//   text(mic.getLevel(), 30, 15);
//   if(stopAt) text((stopAt - millis()).toFixed(0), 30, 25);

//   line(0, mic.getLevel() * 1200, width, mic.getLevel() * 1200);
//   line(0, threshold * 1200, width, threshold * 1200);
//   line(0, lowerThreshold * 1200, width, lowerThreshold * 1200);

//   lastRecording = recording;
// }

// function mousePressed() {
//   // ensure audio is enabled
//   userStartAudio();

//   if(mic.enabled) loop();
// }


// function setupRecord() {
//  // create a sound recorder
//  recorder = new p5.SoundRecorder();

//  // connect the mic to the recorder
//  recorder.setInput(mic);

//  // this sound file will be used to
//  // playback & save the recording
//  soundFile = new p5.SoundFile();
// }