const mongoose =require("mongoose")

const users = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    img_url: { type: String },
    role_id: { type: Number},  //admin & user
    reservations:  [{type: mongoose.Schema.Types.ObjectId, ref: "party"}] , // اري لحفظ الحفلات المحجوزة لكل يوزر //
})



module.exports = mongoose.model("users", users);
