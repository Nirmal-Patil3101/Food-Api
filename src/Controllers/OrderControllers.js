import { request } from "express";
import { Order } from "../models/OrderSchema.js";

const addorder = async (req, res) => {
  console.log(req.body);
  try {
    const addedorder = await Order.create(req.body);
    res.status(200).json(addedorder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getallOrder = async (req, res) => {
  try {
    const order = await Order.find()
      .populate("ordercustomerid")
      .where("orderStatus")
      .ne("cancel")
      .populate("orderItems.dishid");
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
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
const Getorderbycustomerid = async (req, res) => {
  try {
    let Getorderbycustomerid = await Order.find({
      ordercustomerid: req.body.ordercustomerid,
    })
      .populate("ordercustomerid")
      .where("orderStatus")
      .eq(req.body.orderStatus)
      .populate("orderItems.dishid");
    res.status(200).json(Getorderbycustomerid);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const Getorderbystatus = async (req,res)=>{
  try {
    let getorderbystatus = await Order.find()
    .populate("ordercustomerid").where("orderStatus").eq(req.body.orderStatus)
    .populate("orderItems.dishid");
    res.status(200).json(getorderbystatus);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


export { addorder, getallOrder, deleteorder, updateorder, Getorderbycustomerid , Getorderbystatus};
