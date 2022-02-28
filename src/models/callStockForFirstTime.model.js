const Base = require("./base.model");


const fetch = require('node-fetch');
require('dotenv').config();
const key = process.env.ALPHA_KEY


class CallStockForFirstTime extends Base {

    addData(stockTicker){


          const endPoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockTicker}&outputsize=full&apikey=${key}`
          
          async function getResuts(stockTicker) {
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
                                await sleep(500)
                                
                                      const symbol_date = await dataToArray[firstId][0];//brings back the dates
                                      const opening = await dataToArray[firstId][1]["1. open"];
                                      const high = await dataToArray[firstId][1]["2. high"];
                                      const low = await dataToArray[firstId][1]["3. low"];
                                      const closing = await dataToArray[firstId][1]["4. close"];
                                        this.query(`INSERT INTO ${stockTicker}  ( symbol, symbol_called_date, opening, high, low, closing) VALUES ("${stockTicker}","${symbol_date}", "${opening}" ,"${high}","${low}", "${closing}")`)
                                      
                                    
                              }
                      }                                  
                      insertData()
                      .catch(err =>console.log(err))


                };
                getResuts(stockTicker).catch((err)=>{console.log(err)})
    };

}; 
    
  module.exports = CallStockForFirstTime;
  