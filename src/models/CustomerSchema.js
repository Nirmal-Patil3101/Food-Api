import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    cname: {
        type:String,
        required:[true,"Name is required"],
        //unique:true
    },
    cemail: {
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    cmobile: {
        type:Number,
        required:[true,"Mobile is required"],
        //unique:true
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:[true,"Seletc gender"]
    },
    cadders: {
        type:String,
        required:[true,"Adderss is required"]
    },
    ccity: {
        type:String,
        required:[true,"City is required"]
    },
    cstate: {
        type:String,
        required:[true,"State is required"]
    },
    cpincode: {
        type:Number,
        required:[true,"Pin code is required"]
    },
    cphoto: {
        type:String,
        required:[true,"Photo is required"]
    },
    cisBlock: {
        type:String,
        required:[true]
    }
})

export const Customer = mongoose.model("Customer",customerSchema);