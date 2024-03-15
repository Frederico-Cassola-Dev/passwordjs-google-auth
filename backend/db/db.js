//importing mysql package so the we can add our database credentials
const mysql = require("mysql2")
require('dotenv/config');
//Configuring credentials
const db = mysql.createPool({
    connectionLimit: 520,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Exporting this file so that we can access this anywhere on our server by importing it.
module.exports = db;
