const router = require("express").Router();
const jobs = require('../config/croneJobs.config')
const models = require('../models')
const cronJob = require('cron').CronJob;

    


router.post('/stock', stockCaller);
router.post('/currency', currencyCaller)


 function stockCaller (req, res)  {
    
  const { command } = req.body;  
       
      if(command !== "true"){
        res.send( {message: "can't not start calling stocks!" } )
        res.status(400)
        .end()
        
      } else {
        startCallingStocks()
        res.send( {message: "start calling stocks" } )
        res.status(201)
         .end()
      }  
   
   }

   
    
    
 function currencyCaller (req, res) {
      
  const { command } = req.body;  

      if(command !== "true"){
         res.send( {message: "can't not start calling currencies!" } )
         res.status(400)
         .end()
            
      } else {
         startCallingCurrencies()
         res.send( {message: "start calling currencies" } )
         res.status(201)
         .end()
      }  
      
  }
    

 

const startCallingStocks = () => {
    
        const job = new cronJob (jobs.stockJobs.pattern, 
            () => {
              //console.log("Im calling Stocks")
              models.callStock.callStocks()
                          
                           
            }, null, true, jobs.stockJobs.timeZone
        )
        job.start()          
 };



 const startCallingCurrencies = () => {
    
  const job = new cronJob (jobs.currncyJobs.pattern, 
      () => {
        
        console.log("Im calling currencies")
                     
      }, null, true, jobs.currncyJobs.timeZone
  )
  job.start()          
};

module.exports = router