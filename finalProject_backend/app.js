const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");


app.use(express.json());
app.use(cors());

const signup = require('./routers/routes/signUpRoute');
const signin = require('./routers/routes/loginRoute');
const party = require('./routers/routes/partyRoute');
const songer = require('./routers/routes/songersRoute');

app.use('/', signup);
app.use('/', signin);
app.use('/', party);
app.use('/', songer);





const Port = 5000;
app.listen( process.env.PORT || Port,()=>{
    console.log("server is running");
})
