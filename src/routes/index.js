const controllers = require("../controllers");
const router = require("express").Router();
const limiter = require("../config/apiLimiter.confic");



//start calling Daily
//================
router.use("/callforfirsttime", controllers.callForFirstTime)   



router.use("/", (req, res)=>{
    res.send("Hi from firstCall")
})



 module.exports = router;