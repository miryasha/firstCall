const router = require("express").Router();
const jobs = require('../config/croneJobs.config')
const models = require('../models')
const cronJob = require('cron').CronJob;

    


router.post('/stock', stockCaller);
//router.post('/currency', currencyCaller)


 function stockCaller (req, res)  {
    
  const { stockTicker } = req.body;  
       
          
      models.callStockForFirstTime.addData( stockTicker )  
      .then(() => {
          res.send( {message: "we are working on that it takes 4 hours!!" } )
          res.status(201)
          .end()
      })
      .catch(err => {
          console.log(err)
          res.send( { err : err })
          res.status(500)
          .end()
          
      })
        
   
   }

   


 



module.exports = router