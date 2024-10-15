import mongoose from "mongoose";

const dishSchema = mongoose.Schema({
    dname:{
        type:String,
        required:[true,"Dish name is required"],
        unique:true
    },
    dprice:{
        type:Number,
        required:[true,"Price is required"]
    },
    dtype:{
        type:String,
        enum:['Vegetarians','non-vegetarians'],
        required:[true,"type id required"]
    },
    dcategory:{
        type:String,
        enum:['Indian','Italian','south indian'],
        required:[true,"category is required"]
    },
    dimg:{
        type:String,
        required:[true,"img is required"]
    },
    disavailable:{
        type:String,
        required:[true]
    }
})

export const Dish = mongoose.model("Dish",dishSchema);