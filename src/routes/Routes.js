import express from "express";
import {
  addcustomer,
  deleteCustomer,
  doLogin,
  getAllCustomer,
  updateCustomer,
} from "../Controllers/CustomerControllers.js";
import {
  adddish,
  deletedish,
  getallDish,
  getDishesWithAvgRating,
  updatedish,
} from "../Controllers/DishControllers.js";
import {
  addorder,
  deleteorder,
  getallOrder,
  Getorderbycustomerid,
  Getorderbystatus,
  getTopDishes,
  totalRevenue,
  updateorder,
} from "../Controllers/OrderControllers.js";
import { upload } from "../middleware/multerUpload.js";
import { DashboardCollecion } from "../Controllers/DashboardControllers.js";
import { addReview, DeleteReview, getallReview, UpdateReview } from "../Controllers/ReviewControllers.js";

const router = express.Router();

//Customer
router.post("/addcustomer", upload.single("image"), addcustomer);
router.get("/all", getAllCustomer);
router.delete("/deletecustomer", deleteCustomer);
router.put("/updatecustomer", updateCustomer);
router.post("/dologin", doLogin);

//Dish
router.post("/adddish", upload.single("image"), adddish);
router.get("/getdish", getallDish);
router.delete("/deletedish", deletedish);
router.put("/updatedish", updatedish);
router.get("/getdisheswithavgrating",getDishesWithAvgRating)

//Order
router.post("/addorder", addorder);
router.get("/allorder", getallOrder);
router.delete("/deleteorder", deleteorder);
router.put("/updateorder", updateorder);
router.post("/Getorderbycustomerid",Getorderbycustomerid);
router.post("/getorderbystatus",Getorderbystatus);
router.get("/totalrevenue",totalRevenue);
router.get("/gettopdishes",getTopDishes);

//Dashbord
router.get("/dashbordcollection",DashboardCollecion);

//Review
router.post("/addreview",addReview);
router.get("/getallreview",getallReview);
router.delete("/deletereview",DeleteReview);
router.put("/updatereview",UpdateReview);

export { router };
