const rateLimit = require("express-rate-limit");

const apiLimiterApi = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutes
    max: 500,
    message:  "Too many tries, please try again after 30 minutes"
  });


  module.exports = { apiLimiterApi : apiLimiterApi}