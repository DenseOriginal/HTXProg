import { createConnection } from "mysql2";
import prompt from "prompt";
import { playGame } from "./game";

const connection = createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: 'test1234',
  // database: 'mysql'
  host: "5.tcp.eu.ngrok.io",
  port: 13659,
  user: "user",
  password: "pass",
  database: "development"
});

connection.connect();

async function run() {
    prompt.start();
    const userId: number = await getOrCreateUser();

    logEvent('game-started', userId);
    console.log('Game begin');
    console.log('\n');
    
    playGame((event, data) => logEvent(event, userId, data));
}

run();

async function getOrCreateUser() {
    prompt.start();
    const { playedBefore } = await prompt.get({ description: 'Have you played this before?', name: 'playedBefore' });
    
    if (playedBefore == 'y') {
        const { idInput } = await prompt.get({ description: 'What is your user ID?', name: 'idInput' });
        const user = await querySingle('SELECT * FROM Users WHERE id = ?', [idInput]);
        console.log('Found user: ', user);
        if(!user) {
            console.log('Can\'t find user');
            return createUser();
        }

        logEvent('user-login', user.id);
        return user.id;
    } else {
        console.log('Okay :)');
        return createUser();
    }
}

async function createUser() {
    const { name } = await prompt.get({ description: 'What is your name?', name: 'name' });
    const t = await connection.promise().execute('INSERT INTO Users (`name`) values (?)', [name]);
    const insertId = (t[0] as any).insertId;
    console.log(`Hello ${name}, your id is ${insertId}`);

    logEvent('user-created', insertId);
    return insertId;
}

const querySingle = async (query: string, params: any[]) =>
    ((await connection.promise().query(query, params))[0] as any)[0];

const queryMultiple = async (query: string, params: any[]) =>
    (await connection.promise().query(query, params))[0];

const logEvent = async (event: string, userId: number, data: string | null = null) =>
    connection.promise().execute('INSERT INTO Events (`userId`, `event`, `data`) values (?, ?, ?)', [userId, event, data]);