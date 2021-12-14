const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");


app.use(express.json());
app.use(cors());

const signup = require('./routers/routes/signUpRoute');
const signin = require('./routers/routes/loginRoute');


app.use('/', signup);
app.use('/', signin);






////////////////////////////
const Port = 5000;
app.listen(process.env.PORT || Port,()=>{
    console.log("server is running");
})
