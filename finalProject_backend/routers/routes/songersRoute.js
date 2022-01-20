const express = require("express");
const songerRoute = express.Router();
const {
  getAllSongers,
  insertSonger,
  deleteSonger,
} = require("../controllers/songers");
const { authentication } = require("../middlewares/authentication");

songerRoute.post("/songer/", authentication, getAllSongers);
songerRoute.post("/songer", authentication, insertSonger);
songerRoute.delete("/songer/:id", authentication, deleteSonger);

module.exports = songerRoute;
