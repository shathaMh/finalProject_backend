const Party = require("../../db/models/party");
//party obj from model
const getAllParties = async (req, res) => { 
    try {
        const parties = await Party.find() //استرجع كل الحفلات
        res.status(200).json(parties) 
    } catch (error) {
        res.send(error)
    }
};
// لاضافة حفلة  // 
const insertParties = async (req, res) => {
    let { name, description, price, img_url, category } = req.body;

        try {
          const party = await new Party({ name, description, price, img_url, category }); //اوبجكت من نوع المودل نفسه
          const response = await party.save()
          res.status(201).json(response)
    } catch (error) {
            res.send(error)
        }
};

const updateParty = async (req, res) => {
    const id = req.params.id;
    let { description, price} = req.body; //ينرسل لي بالبدي السعر و الوصف اللي انا اسوي عليهم تعديلات
    try {
      const updated = await Party.findOneAndUpdate( // اجيب الحفلة اللي بعدل عليها
        { _id: id },
        { description: description, price: price }, // الابديت الجديد
        { new: true } // عشان ارجع الداتا المحدثةالجديدة للفرونت
      );
      res.status(200).json(updated);
    } catch (error) {
      res.send(error);
    }
};


const deleteParty = async (req, res) => { // احدد الحفلة من الاي دي و احذف
    const id = req.params.id; 
    try {
      const deleted = await Party.findOneAndDelete({ _id: id});
      res.status(200).json(deleted);
    } catch (error) {
      res.send(error);
    }
  };

module.exports = { getAllParties, insertParties, updateParty, deleteParty};
