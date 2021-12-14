const mongoose =require("mongoose")

const users = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    img_url: { type: String }

})



module.exports = mongoose.model("users", users);
