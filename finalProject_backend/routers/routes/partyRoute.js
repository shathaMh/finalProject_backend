const express = require("express");
const partyRoute = express.Router();
const { getAllParties, insertParties, updateParty, deleteParty } = require("../controllers/party");
const { authentication } = require("../middlewares/authentication")

partyRoute.get("/party", authentication, getAllParties);
partyRoute.post("/party", authentication, insertParties);
partyRoute.put("/party/:id", authentication, updateParty);
partyRoute.delete("/party/:id", authentication, deleteParty);

module.exports = partyRoute;
