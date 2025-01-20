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
    )
    .populate("orderItems.dishid")
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

const totalRevenue = async (req, res) => {
  try {
      const result = await Order.aggregate([
          {
              $match: {
                orderStatus: "Delivered",
              }
          },
          // {
          //     $unwind: "$items" // Unwind the items array to process individual dishes
          // },
          {
              $group: {
                  _id: null, // No grouping key to calculate the total
                  totalRevenue: { $sum: "$orderTotal" } // Sum up the OrderTotal field
              }
          }
      ])
      console.log(result);
      res.status(200).json({ data: result })
  } catch (error) {
      console.log(error.message);
  }
};

const getTopDishes = async (req, res) => {
  try {
      const topDishes = await Order.aggregate([
          // Stage 1: Match only Delivered orders
          {
              $match: { orderStatus: "Delivered" },
          },
          // Stage 2: Unwind the items array to break down each dish into a separate document
          {
              $unwind: "$orderItems", // Break down array of dishes into individual records
          },
           // Stage 3: Lookup dish details for more information (like name and price)
           {
              $lookup: {
                  from: "dishes", // 'dishes' collection
                  localField: "orderItems.dishid", // The dish ID in the items array
                  foreignField: "_id", // The dish ID in the dishes collection
                  as: "dishDetails"
              }
          },
          // Stage 4: Unwind the dishDetails to flatten the array
          {
              $unwind: "$dishDetails" // Each document will have a single dishDetail object
          },
          // Stage 5: Group by dish ID to calculate total quantity and total revenue per dish
          {
              $group: {
                  _id: "$orderItems.dishid", // Group by dish ID
                  totalQuantity: { $sum: "$orderItems.Qty" }, // Sum up the quantities qty is orderschema
                  totalRevenue: { $sum: { $multiply: ["$orderItems.Qty",{ $toDouble: "$dishDetails.dprice" } ] } } // Calculate revenue per dish dprice is dishschema
              }
          },
          // Stage 6: Sort by total quantity in descending order
          {
              $sort: {
                  totalQuantity: -1
              }
          },
          // Stage 7: Limit to the top 10 dishes
          {
              $limit: 3
          },
          // Stage 8 (Optional): Lookup dish details for more information (like name)
          {
              $lookup: {
                  from: "dishes", // 'dishes' collection
                  localField: "_id", // The dish ID from the items array
                  foreignField: "_id", // The dish ID in the dishes collection
                  as: "dishDetails"
              }
          },
          // Stage 9 (Optional): Format the output
          {
              $project: {
                dishid: "$_id",
                totalQuantity: 1,
                  totalRevenue: 1,
                  dishDetails: { $arrayElemAt: ["$dishDetails", 0] } // Take the first matching dish detail
              }
          }
      ]);

      res.status(200).json({ data: topDishes });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


export { addorder, getallOrder, deleteorder, updateorder, Getorderbycustomerid , Getorderbystatus, totalRevenue,getTopDishes};
