const mysql = require('mysql');
require('dotenv').config()
 
const pool = mysql.createPool({
    connectionLimit: 100,
    user: "root",
    password: "",
    host: "localhost",
    port: 3306,
    database: 'to-do-app',
    debug: false
});
 
module.exports = pool;