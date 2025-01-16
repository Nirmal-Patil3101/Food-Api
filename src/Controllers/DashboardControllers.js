import { Dish } from "../models/DishSchema.js";
import { Order } from "../models/OrderSchema.js";
import { Customer } from "../models/CustomerSchema.js";
import {Review} from "../models/ReviewSchema.js"
const DashboardCollecion = async (req,res)=>{
    try {
        const DishCounter= await Dish.countDocuments();
        const CustomerCounter = await Customer.countDocuments();
        const OrderCounter = await Order.countDocuments();
        const ReviewCounter = await Review.countDocuments();

        const counter ={
            CustomerCounter,
            OrderCounter,
            DishCounter,
            ReviewCounter
        }

        res.status(200).json({data:counter})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export {DashboardCollecion}