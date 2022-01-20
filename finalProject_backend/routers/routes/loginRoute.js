const express = require("express");
const loginRoute = express.Router();

const { login, reserve, getUserParties, cancelReserve } = require("../controllers/login");
const { authentication } = require("../middlewares/authentication")

loginRoute.post("/signin", login);
loginRoute.post("/reserve", authentication, reserve);
loginRoute.get("/reservation/:email", authentication, getUserParties);
loginRoute.delete("/calcelReservation/:id", authentication, cancelReserve);

module.exports = loginRoute;
