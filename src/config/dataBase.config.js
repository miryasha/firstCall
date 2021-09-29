const mysql = require("mysql");
require('dotenv').config();

const connection = mysql.createConnection({
    
    host: process.env.DB_HOST ,
    port: process.env.DB_PORT ,
    database: process.env.DB_NAME,

    user: process.env.DB_ADMIN_USER_NAME,
    password: process.env.DB_ADMIN_PWD, 
      
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