import { Dish } from "../models/DishSchema.js";

const adddish = async (req, res) => {
  console.log(req.body);
  try {
    const addeddish = await Dish.create({...req.body,dimg:req.file.path});
    res.status(200).json(addeddish);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getallDish = async (req, res) => {
  try {
    const dish = await Dish.find();
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletedish = async (req, res) => {
  try {
    let dishid = req.body.dishid;
    const deleteddish = await Dish.findByIdAndDelete(dishid);
    res.status(200).json(deleteddish)
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatedish = async (req, res) => {
  try {
    let updateddish = await Dish.findByIdAndUpdate(
      { _id: req.body.dishid },
      { dprice: req.body.dprice },
      { new: true }
    );
    res.status(200).json(updateddish);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { adddish, getallDish, deletedish, updatedish };
