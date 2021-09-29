const Base = require("./base.model");
const CryptoJS = require("crypto-js");
const mysql = require("mysql");
const fetch = require('node-fetch');

require('dotenv').config();
const key = process.env.ALPHA_KEY
const dbKey = process.env.PASS_HASH_DATABASE


  class CallStockForFirstTime extends Base {
    addData(symbol,  database_name, table_name, host, port , user, password){

       const createTable = this.create(symbol, database_name, table_name, host, port , user, password);

       createTable.then( 
           async ()=>{  
                        const dbCongig = await mysql.createConnection({
                            
                            host: host,
                            port: port,//port
                            user: user,//username
                            password: password,//password
                            database: database_name//database
                                
                        });

                        
                            const endPoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${key}`
                            const response = await fetch(endPoint)
                            const data = await response.json(); 

                            const ohlcData = await data["Time Series (Daily)"];
                            const dataToArray = await Object.entries(ohlcData);  //loop throgh all keys & values
                            
                            const sleep = (milliseconds) => {
                                return new Promise(resolve => setTimeout(resolve, milliseconds))
                              }
                              
                              
                              const insertData = async () => {

                                let firstId = parseInt(dataToArray.length -1) ;
                                for (let j = 0 ; j <= firstId ; firstId--) {
                                  await sleep(2000)
                                  
                                       const symbol_date =  dataToArray[firstId][0];//brings back the dates
                                       const opening =  dataToArray[firstId][1]["1. open"];
                                       const high =  dataToArray[firstId][1]["2. high"];
                                       const low =  dataToArray[firstId][1]["3. low"];
                                       const closing =  dataToArray[firstId][1]["4. close"];
                                      
                                      let sql =  `INSERT INTO ${symbol}  ( symbol, symbol_date, opening, high, low, closing) VALUES ("${symbol}","${symbol_date}", "${opening}" ,"${high}","${low}", "${closing}")`
                                      dbCongig.query(sql, function(err, rows){
                                                if(err){ 
            
                                                console.log(err)
                                                }
                                                else {
                                                
                                                console.log(rows.affectedRows)
                                                }
                                           })
                                            

                                }
                                dbCongig.end()
                                         
                                        // // Encrypt database_name
                                        const encryptDatabase_name = CryptoJS.AES.encrypt( database_name , process.env.PASS_HASH_DATABASE ).toString();
                                        // // Encrypt host
                                        const encryptHost = CryptoJS.AES.encrypt( host , process.env.PASS_HASH_DATABASE ).toString();
                                        // // Encrypt password
                                        const encryptPassword = CryptoJS.AES.encrypt( password , process.env.PASS_HASH_DATABASE ).toString();
                                        this.insert({ symbol, database_name : encryptDatabase_name, table_name, host: encryptHost, port , user, password : encryptPassword })
                                }
                              
                              insertData().catch(err =>console.log(err))

   
             }
                                       

        )
           

    }

    insert(args){
        return this.query(`INSERT INTO call_criteria_stock_tbl SET?`, [args]);
    }

    update(database_name, table_name, host, port , user, password, call_criteria_stock_id){

       return this.query(`UPDATE  call_criteria_stock_tbl SET  database_name ="${database_name}", table_name ="${table_name}", host ="${host}", port ="${port}", user ="${user}", password ="${password}" WHERE call_criteria_stock_id= "${call_criteria_stock_id}"`); 
    }

    getAll(){
        return this.query(`SELECT * FROM call_criteria_stock_tbl `);
    }

    getById(call_criteria_stock_id){
        return this.query(`SELECT * FROM call_criteria_stock_tbl WHERE call_criteria_stock_id=${call_criteria_stock_id} `);
    }

    
    deleteById(call_criteria_stock_id){
        return this.query(`DELETE FROM  call_criteria_stock_tbl WHERE call_criteria_stock_id="${call_criteria_stock_id}" `);
    }




    async create (symbol,  database_name, table_name, host, port , user, password){


        const dbCongig = await mysql.createConnection({
                
            host: host,
            port: port,//port
            user: user,//username
            password: password,//password
            database: database_name//database
                
        });


          return new Promise((resolve, reject) => {

                let sql =  `
                CREATE TABLE IF NOT EXISTS ${symbol}
                    
                    (
                        ${symbol}_id INT NOT NULL AUTO_INCREMENT,
                        symbol varchar(20) NOT NULL,
                        symbol_date varchar(20) NOT NULL UNIQUE,
                        opening  varchar(20) NOT NULL,
                        high varchar(20) NOT NULL,
                        low   varchar(20) NOT NULL ,
                        closing   varchar(20) NOT NULL,
                                        
                        PRIMARY KEY (${symbol}_id)
                    );  
                `;

                dbCongig.query(sql, function(err, rows){
                if(err){ 

                  return reject(err); 
                }
                else {
                  return resolve(rows);
                  console.log(rows.affectedRows)
                }
            })
            dbCongig.end()
               }).catch(err => {
                   console.log(err)
               }); 
    }

} 
    
    
  
  module.exports = CallStockForFirstTime;
  