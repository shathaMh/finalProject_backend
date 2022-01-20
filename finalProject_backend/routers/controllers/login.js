const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../db/models/users");
const Party = require("../../db/models/party");

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email }); //check email
    console.log(user);
    //   {
    //   _id: new ObjectId("61c1aef42a80d4a837036944"),
    //   first_name: 'h',
    //   last_name: 'h',
    //   email: 'h',
    //   password: '$2b$10$50G7Jr/CuhMh7zMf947t3uxPi6hI2cwsQE4LDgYt0wjxf2OMzxHhS',
    //   role_id: 2,
    //   __v: 0
    // }
    // || null
    if (user !== null) {
      const check = await bcrypt.compare(password, user.password);
      if (check === true) {
        const payload = { userId: user._id, userName: user.first_name }; // ينشأ التوكن و احمل عليه بعض المتغيرات احط داخله اوبجكت جواته بعض البروبرتز اجيبهم من بيانات اليوزر اللي دخل
        const token = jwt.sign(payload, "ABC"); // ينعمل للتوكن انشاء من خلال الpaylod
        let roles = [];
        if (user.role_id === 1) {
          // اذا كان 1 يعني له صلاحيات الادمن
          roles.push(
            "DisplayParties",
            "AddParties",
            "UpdateParties",
            "DeleteParties"
          );
        } else {
          // يكون يوزر
          roles.push("DisplayParties");
        }
        res.status(200).json({ token, roles }); // ارجع التوكن اللي صارله انشاء و ارجع الاري حسب 1 او 2
        // res.status(200).json(`Hello admain! ${user.name}`);
      } else {
        res.status(403).json("wrong PassWord!");
      }
    } else {
      res.status(404).json("wrong Email!");
    }
  } catch (error) {
    res.send(error);
  }
};

//حجز التذاكر
// لحجز تذكرة احتاج آيدي الحفلة و آي دي اليوزر اللي حاجز الحفلة
const reserve = async (req, res) => {
  const id = req.body.id; //_id // ينرسل لي من البدي
  const user = req.token.userId; // اي دي اليوزر من التوكن
  let newLike;
  try {
    //بعد ما تنرسل لي مجموعة id
    // اسوي عليهم لوب
    for (let i = 0; i < id.length; i++) {
      newLike = await userModel.findOneAndUpdate(
        // اول شيء اوجده لو لقيته اسوي له ابديت عشان يحدث لي على الحجوزات لليوزر
        { _id: user }, //لازم اكون عارفة مين اليوزر اللي يحجز و جبته من الاي دي
        { $push: { reservations: id[i] } }, //اسوي بوش للاري اللي عرفتها بالسكيما التذاكر اللي انحجزت  لليوزر
        { new: true } //ارجع التحديثات للفرونت
      );
    }
    res.status(201).json(newLike);
  } catch (error) {
    res.send(error);
  }
};

const cancelReserve = async (req, res) => {
  const id = req.params.id; // ينرسل لي اي دي الحفلة اللي بمسحها
  const user = req.token.userId;
  let newLike;
  try {
    newLike = await userModel.findOneAndUpdate(
      { _id: user },
      { $pull: { reservations: id } }, // pull *
      { new: true }
    );
    res.status(201).json(newLike);
  } catch (error) {
    res.send({ error });
  }
};
//اجيب الحفلات المحجوزة*
const getUserParties = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email }); // بعد ما يرسل لي الايميل بالبارام اجيب بيانات اليوزر من ضمنها اري الحجز
    let arr = [];
    for (let i = 0; i < user.reservations.length; i++) {
      let parties = await Party.findOne({ _id: user.reservations[i] }); //عشان اجيب بيانات تبع الحفلة نفسها
      arr.push(parties);
    }
    res.status(200).json(arr);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { login, reserve, getUserParties, cancelReserve };
