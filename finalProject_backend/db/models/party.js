const mongoose =require("mongoose")

const party = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    img_url: { type: String },
    category: { type: String}
})



module.exports = mongoose.model("party", party);
