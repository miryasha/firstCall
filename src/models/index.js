const connection = require('../config/dataBase.config');

const CallStockForFirstTime = require("./callStockForFirstTime.model");



module.exports = {
  
  callStockForFirstTime : new CallStockForFirstTime(connection), 
  
  }