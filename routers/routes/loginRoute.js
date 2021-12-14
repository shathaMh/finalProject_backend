const express = require("express");
const loginRoute = express.Router();

const { login } = require("../controllers/login");

loginRoute.post("/signin", login);

module.exports = loginRoute;
