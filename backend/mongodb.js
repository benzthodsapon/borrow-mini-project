const { Client } = require('pg');

// initail database postgres
export const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "postgres"
});

client.connect();

//create table users
// client.query(`CREATE TABLE users (id SERIAL, name VARCHAR(10) NOT NULL, email VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL, role VARCHAR(15) NOT NULL, PRIMARY KEY ("id"))`, (err, res) => {
//     if(!err) {
//         console.log("res : ", res.rows);
//     } else {
//         console.log(err);
//     }
// })

// create data on table
// client.query(
//   "INSERT INTO users(name, email, password)VALUES('Jan', 'mroyster@royster.com', 'jantapa2407.')",
//   (err, res) => {
//     console.log(err, res);
//   }
// );

//get users
// client.query(`Select * from users`, (err, res) => {
//     if(!err) {
//         console.log("res : ",res.rows);
//     } else {
//         console.log("err : ", err.message);
//     }
//     client.end;
// })

// delet users
// client.query('DELETE FROM "users" WHERE "name" = $1', [userName]); // sends queries

