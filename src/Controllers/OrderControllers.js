import { Order } from "../models/OrderSchema.js";

const addorder = async (req, res) => {
  console.log(req.body);
  try {
    const addedorder = await Order.create(req.body);
    res.status(200).json(addedorder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getallOrder = async (req, res) => {
  try {
    const order = await Order.find()
    .populate("ordercustomerid","cname cmobile")
    .populate("orderdishid","dname dprice");
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteorder = async (req, res) => {
  try {
    let orderid = req.body.orderid;
    const deletedorder = await Order.findByIdAndDelete(orderid);
    res.status(200).json(deletedorder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateorder = async (req, res) => {
  try {
    let updatedorder = await Order.findByIdAndUpdate(
      { _id: req.body.orderid },
      { orderStatus: req.body.orderStatus },
      { new: true }
    );
    res.status(200).json(updatedorder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { addorder, getallOrder, deleteorder, updateorder };
