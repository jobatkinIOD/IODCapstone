const mysql = require("mysql2");
require("dotenv").config();
// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log(`Successfully connected to the ${process.env.DB_HOST}/${process.env.DB_NAME} database.`); 
});

module.exports = connection;