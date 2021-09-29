const Base = require("./base.model");
const CryptoJS = require("crypto-js");
const mysql = require("mysql");
const fetch = require('node-fetch');

require('dotenv').config();
const key = process.env.ALPHA_KEY
const dbKey = process.env.PASS_HASH_DATABASE


class CallStockForFirstTime  extends Base{

  callStocks(){
    const list = this.findStockList();
    
    list.then( data => {
        const symbolsLength = data.map( s => s.symbol).length;
        //Check if the list is not empty
        
          if(symbolsLength !==0 ){
            for(let i = 0 ; i < symbolsLength ; i++){
              task(i);
               
             }//end of for
    
             function task(i) {
               setTimeout( async () => {
                const symbol = await data.map( s => s.symbol)[i];
                const time_frame = await data.map( tf => tf.time_frame)[i];
                const cryptoDatabase_name = await data.map( dbn => dbn.database_name)[i]; 
                // Decrypt database_name
                //const decryptDatabase_name  = await CryptoJS.AES.decrypt(cryptoDatabase_name, dbKey);
               // const database_name = await decryptDatabase_name.toString(CryptoJS.enc.Utf8);
    
                const table_name = await data.map( tbl => tbl.table_name)[i]; 
                const cryptoHost = await data.map( h => h.host)[i]; 
                // Decrypt host
                //const decryptHost  = await CryptoJS.AES.decrypt(cryptoHost, dbKey);
                //const host = await decryptHost.toString(CryptoJS.enc.Utf8);
    
                const port = await data.map( p => p.port)[i]; 
                const user = await data.map( u => u.user)[i]; 
                const cryptoPassword = await data.map( pass => pass.password)[i]; 
                // Decrypt pass
                //const decryptPass  = await CryptoJS.AES.decrypt(cryptoPassword, dbKey);
                //const password = await decryptPass.toString(CryptoJS.enc.Utf8);
    
                const dbCongig = await mysql.createConnection({
        
                    host: cryptoHost,
                    port: port,//port
                    user: user,//username
                    password: cryptoPassword,//password
                    database: cryptoDatabase_name,//database
                  
                });
                
                
                 const endPoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${key}`
                 const response = fetch(endPoint)
                        .then(res => res.json())
                           .then(data => {  
    
                                const count = 0;
                                const symbol =  data["Meta Data"]["2. Symbol"];
                                const ohlcData =  data["Time Series (Daily)"];
                                const dataToArray =  Object.entries(ohlcData);  //loop throgh all keys & values
    
                                const symbol_date =  dataToArray[count][0];//brings back the dates
                                const opening =  dataToArray[count][1]["1. open"];
                                const high =  dataToArray[count][1]["2. high"];
                                const low =  dataToArray[count][1]["3. low"];
                                const closing =  dataToArray[count][1]["4. close"];
                                           
                                return new Promise((resolve, reject) => {
    
                                      let sql =  `INSERT INTO ${table_name}  ( symbol, symbol_date, opening, high, low, closing) VALUES ("${symbol}","${symbol_date}", "${opening}" ,"${high}","${low}", "${closing}")`
                                      dbCongig.query(sql, function(err, rows){
                                      if(err){ 
    
                                        return reject(err); 
                                      }
                                      else {

                                        return resolve(data);
                                        
                                      }
                                  })
                                  dbCongig.end()
                              }).catch(err => {
                                return err
                              }); 
                                                                 
                    });//==end of second data

               }, 5000 * i);
             } // end of task

          } else {

            return { "message"  : "somthing went wrong on calling Stock models"};

          }

        
       
                        
      }//end of findStockList
 )//end of then
    .catch(err => {
      console.log(err);
      res.status(500).end();
     });

  };//end of call stock


    findStockList(){
    
    return this.query(`SELECT * FROM call_criteria_stock_tbl`);
           
     }



 }

  module.exports = CallStockForFirstTime;              