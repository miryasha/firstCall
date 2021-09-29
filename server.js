const express = require("express");
const cors = require('cors');


const corsOptions = require('./src/config/cors.config');
const routes = require("./src/routes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(cors(corsOptions))



// Routes
app.use(routes)




// Starts the server to begin listening
// =============================================================

app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });