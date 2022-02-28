const connection = require('../config/dbConnection.config');

const CallStockForFirstTime = require("./callStockForFirstTime.model");

module.exports = {
  
  callStockForFirstTime : new CallStockForFirstTime(connection), 
  
  }