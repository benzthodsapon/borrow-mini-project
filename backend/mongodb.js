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


module.exports = client;
