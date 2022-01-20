const Songer = require("../../db/models/songers");

const getAllSongers = async (req, res) => {
  try {
    const songers = await Songer.find(); //استرجع كل المغنيين
    console.log(songers);
    res.status(200).json(songers);
  } catch (error) {
    res.send(error);
  }
};

const insertSonger = async (req, res) => {
  let { name, age } = req.body;
  try {
    const songer = await new Songer({ name, age });
    const response = await songer.save();
    res.status(201).json(response);
  } catch (error) {
    res.send(error);
  }
};

const deleteSonger = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Songer.findOneAndDelete({ _id: id });
    res.status(200).json(deleted);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllSongers, insertSonger, deleteSonger };
