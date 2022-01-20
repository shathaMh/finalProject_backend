const express = require("express");
const signUpRoute = express.Router();

const { addUser, addAdmin } = require("../controllers/signUp");

signUpRoute.post("/signUp", addUser);
signUpRoute.post("/adminSignUp", addAdmin);

module.exports = signUpRoute;
