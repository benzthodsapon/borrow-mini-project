const Client = require('pg').Pool;

// initail database postgres
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "postgres"
});

client.connect(); 

//create table users
// client.query(`CREATE TABLE users (id BIGSERIAL, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, role VARCHAR(100) NOT NULL, PRIMARY KEY ("id"))`, (err, res) => {
//     if(!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err);
//     }
// })


//create table borrow
// client.query(`CREATE TABLE borrows (id BIGSERIAL, title VARCHAR(500) NOT NULL, category VARCHAR(500) NOT NULL, image VARCHAR(500) NOT NULL, description VARCHAR(1000) NOT NULL, price INT NOT NULL, rate FLOAT NOT NULL, count INT NOT NULL, PRIMARY KEY ("id"))`, (err, res) => {
//     if(!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err);
//     }
// })

// //create table wishlist
// client.query(`CREATE TABLE wishlist (id BIGSERIAL, title VARCHAR(100) NOT NULL, category VARCHAR(100) NOT NULL, image VARCHAR(100) NOT NULL, description VARCHAR(100) NOT NULL, price VARCHAR(100) NOT NULL , rating INT NOT NULL, count INT NOT NULL, PRIMARY KEY ("id"))`, (err, res) => {
//     if(!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err);
//     }
// })

// //create table wishlist
// client.query(`CREATE TABLE wishlist (id BIGSERIAL, title VARCHAR(100) NOT NULL, category VARCHAR(100) NOT NULL, image VARCHAR(100) NOT NULL, description VARCHAR(100) NOT NULL, price VARCHAR(100) NOT NULL , rating INT NOT NULL, count INT NOT NULL, PRIMARY KEY ("id"))`, (err, res) => {
//     if(!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err);
//     }
// })



module.exports = client;
