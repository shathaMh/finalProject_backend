require('dotenv').config()
require("./DB/db");
const express = require("express");
let cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());




///////////////////

const ActivRoute = require("./Routers/route/RouteActive");
const signUpRoute = require("./Routers/routes/signUpRoute");
const loginRoute  = require("./Routers/routes/loginRoute")

app.use(ActivRoute);
app.use(signUpRoute);
app.use(loginRoute);





///////////////////
const port = 5000;
app.listen( process.env.PORT || port, () => {
  console.log("server is running");
});