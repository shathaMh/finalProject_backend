const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://partyManager:1329@cluster0.lztls.mongodb.net/test").then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);
