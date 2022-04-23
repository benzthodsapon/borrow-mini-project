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

module.exports = client;
