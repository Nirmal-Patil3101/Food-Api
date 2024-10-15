import express from "express";
import { addcustomer, deleteCustomer, getAllCustomer, updateCustomer } from "../Controllers/CustomerControllers.js";
import { adddish, deletedish, getallDish, updatedish } from "../Controllers/DishControllers.js";
import { addorder, deleteorder, getallOrder, updateorder } from "../Controllers/OrderControllers.js";

const router = express.Router()

router.post("/addcustomer",addcustomer)
router.get("/all",getAllCustomer)
router.delete("/deletecustomer",deleteCustomer)
router.put("/updatecustomer",updateCustomer)

//Dish 
router.post("/adddish",adddish)
router.get("/getdish",getallDish)
router.delete("/deletedish",deletedish)
router.put("/updatedish",updatedish)

//Order
router.post("/addorder",addorder)
router.get("/allorder",getallOrder)
router.delete("/deleteorder",deleteorder)
router.put("/updateorder",updateorder)

export {router}