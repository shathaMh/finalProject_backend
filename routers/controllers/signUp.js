const bcrypt = require("bcrypt");
const userModel  = require("../../db/models/users")

const addUser = async(req, res) => {
  let { first_name, last_name, email, password } = req.body;
  
  try {
      password = await bcrypt.hash(password,10);
      const newUser = new userModel({ first_name, last_name, email, password });
      const response = await newUser.save();
      res.status(201).json(response);
  } catch (error) {
      res.send(error)
  }
};

module.exports = { addUser };
