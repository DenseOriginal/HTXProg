let mic, recorder, soundFile;

const myRec = new p5.SpeechRec('en-US', () => {
  const mostrecentword = myRec.resultString.split(' ').pop();
  console.log(mostrecentword);

  if(mostrecentword.toLowerCase() == triggerWord) {
    console.log('Recording');
    recorder.record(soundFile, 20, () => {
      console.log('Not Recording');
      save(soundFile, 'recording.wav');
      setupRecorder();
    })
  }
}); // new P5.SpeechRec object

myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

const triggerWord = "record";

function setup() {
  myRec.start();

  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  setupRecorder();
}

function setupRecorder() {
  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();
}