const mysql = require("mysql");
require('dotenv').config();

const connection = mysql.createConnection({
    
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password:  process.env.DB_PWD,
  database: process.env.DB_NAME,
     
  });

//Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error in db USER connecting: " + err.stack);
    return;
  }
  console.log("db USER connected as id " + connection.threadId);
});

module.exports = connection;