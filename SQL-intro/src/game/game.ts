import readline from "readline";

type Events = 'game-won' | 'game-lost' | 'game-guess-high' | 'game-guess-low' | 'unrecognised-input';
type Callback = (event: Events, data?: string) => any;

const maxNumber = 100;

export function playGame(callback: Callback) {
    const randomNumber = Math.round(Math.random() * maxNumber);
    let lives = 10;

    const terminal = readline.createInterface({
    input : process.stdin,
    output : process.stdout
    });

    terminal.setPrompt(`Guess the number! (0-${maxNumber}): `);
    terminal.prompt();
    terminal.on('line', (answer) => {
        const answerNum = parseInt(answer);

        if (answerNum > randomNumber) {
            console.log('Too high!');
            console.log('You have '+lives+' lives left');
            console.log('\n');
            
            callback('game-guess-high', answerNum.toString());
        } else if (answerNum < randomNumber) {
            console.log('Too low!');
            console.log('You have '+lives+' lives left');
            console.log('\n');
            
            callback('game-guess-low', answerNum.toString());
        } else if (answerNum === randomNumber) {
            console.log('W I N N E R ! ! !');
            console.log('You lost only '+ (6-lives) + ' lives');
            terminal.close();
            return callback('game-won');
        } else {
            console.log("That wasn't a number I recognise");
            callback('unrecognised-input', answer);
        }

        lives--;
        if (lives == 0) {
            console.log('G A M E  O V E R ! ! !');
            terminal.close();
            return callback('game-lost');
        }

        terminal.prompt();
    });
}