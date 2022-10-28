import { createConnection } from "mysql2";
import { faker } from '@faker-js/faker';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test1234',
  database: 'mysql'
  // host: "sql11.freesqldatabase.com",
  // user: "sql11519642",
  // password: "jDrCCZhs5D",
  // database: "sql11519642"
});

connection.connect();

const values: string[] = [];

connection.query(`SELECT count(*) FROM users;`, (err, results: any) => {
  if (err) return console.log(err);
  const count: number = results[0]["count(*)"];
  
  for (let i = 0; i < 20000; i++) {
    values.push(`(
      '${faker.name.firstName().replace(/'/g, "\\'")}',
      '${faker.animal.type()}',
      '${faker.color.human()}',
      '${~~(Math.random() * count)}'
    )`);
  }
  
  const sql = `
    INSERT INTO pets (
      name,
      animal,
      color,
      owner
    ) VALUES ${values.join(", ")}
  `;
  
  console.time(`Insert ${values.length} values`);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Number of records inserted: ", result);
    console.timeEnd(`Insert ${values.length} values`);
  });

  connection.end();
});


