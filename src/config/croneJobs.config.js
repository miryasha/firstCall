
///https://crontab.guru/  

//pattern: '0 17 * * 1-5',
///“At 17:00 on every day-of-week from Monday through Friday.”
const stockJobs = 
    {
        pattern: '0 17 * * 1-5',
        timeZone: "US/Eastern",
        symbol: "stock",
        message: 'this runs ever 40 seconds',
    }
   
    const currncyJobs = 
    {
        pattern: '0 17 * * 1-5',
        timeZone: "America/North_Dakota/Center",
        symbol: "currncy",
        message: 'this runs ever 5 seconds',
    }


module.exports = {stockJobs:stockJobs, currncyJobs:currncyJobs}