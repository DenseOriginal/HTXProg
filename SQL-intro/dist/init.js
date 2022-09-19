"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("mysql2");
const faker_1 = require("@faker-js/faker");
const connection = (0, mysql2_1.createConnection)({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'mysql'
});
connection.connect();
const values = [];
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
    '${faker_1.faker.name.firstName().replace(/'/g, "\\'")}',
    '${faker_1.faker.name.lastName().replace(/'/g, "\\'")}',
    '${faker_1.faker.internet.email()}',
    ${~~(Math.random() * 100)},
    '${faker_1.faker.name.jobTitle().replace(/'/g, "\\'")}',
    '${faker_1.faker.color.human()}',
    '${faker_1.faker.music.genre()}',
    '${faker_1.faker.music.songName().replace(/'/g, "\\'")}'
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
    if (err)
        throw err;
    console.log("Number of records inserted: ", result);
    console.timeEnd(`Insert ${values.length} values`);
});
connection.end();
