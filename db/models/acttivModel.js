const mongoose = require("mongoose");


const activModel = new mongoose.Schema({
  title: { type: String, required: true },
  des: { type: String,  required: true  },
  img: { type: String, required: true },
  tic:{type:String,required: true},

  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel'  }
});


module.exports = mongoose.model("activModel", activModel);