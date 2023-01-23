function bruteForce(pass: string) {
    const start = Date.now();
    const possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let attemptedPass = new Array(pass.length + 1).join('a');

    while (attemptedPass !== pass) {
        attemptedPass = nextString(attemptedPass, possibleChars);
    }

    const end = Date.now();
    console.log(`Pass (${pass}) took ${end - start}ms to bruteforce`);
}

function nextString(s: string, possibleChars: string): string {
    let result = '';
    let carry = true;
    for (let i = s.length - 1; i >= 0; i--) {
        let c = s.charAt(i);
        let index = possibleChars.indexOf(c);
        if (carry) {
            if (index === possibleChars.length - 1) {
                result = possibleChars[0] + result;
            } else {
                result = possibleChars[index + 1] + result;
                carry = false;
            }
        } else {
            result = c + result;
        }
    }

    if (carry) {
        result = possibleChars[0] + result;
    }

    return result;
}

bruteForce('hej');
bruteForce('Hello')