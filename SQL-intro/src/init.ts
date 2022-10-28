import { createConnection } from "mysql2";
import { faker } from '@faker-js/faker';

const connection = createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: 'test1234',
  // database: 'mysql'
  host: "4.tcp.eu.ngrok.io",
  port: 18754,
  user: "root",
  password: "root",
  database: "mysql"
});

connection.connect();

const values: string[] = [];

// CREATE TABLE users (
//   id INT NOT NULL AUTO_INCREMENT,
//   first_name varchar(255) NOT NULL,
//   last_name varchar(255) NOT NULL,
//   email varchar(255) NOT NULL,
//   age INT NOT NULL,
//   job_title varchar(255) NOT NULL,
//   favorite_color varchar(255) NOT NULL,
//   favorite_genre varchar(255) NOT NULL,
//   favorite_song varchar(255) NOT NULL,
//   PRIMARY KEY (id)
// );

for (let i = 0; i < 50000; i++) {
  values.push(`(
    '${faker.name.firstName().replace(/'/g, "\\'")}',
    '${faker.name.lastName().replace(/'/g, "\\'")}',
    '${faker.internet.email()}',
    ${~~(Math.random() * 100)},
    '${faker.name.jobTitle().replace(/'/g, "\\'")}',
    '${faker.color.human()}',
    '${faker.music.genre()}',
    '${faker.music.songName().replace(/'/g, "\\'")}'
  )`);
}

const sql = `
  INSERT INTO users (
    first_name,
    last_name,
    email,
    age,
    job_title,
    favorite_color,
    favorite_genre,
    favorite_song
  ) VALUES ${values.join(", ")}
`;

console.time(`Insert ${values.length} values`);
connection.query(sql, (err, result) => {
  if (err) throw err;
  console.log("Number of records inserted: ", result);
  console.timeEnd(`Insert ${values.length} values`);
});

connection.end();
