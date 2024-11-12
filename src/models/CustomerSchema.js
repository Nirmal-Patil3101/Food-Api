import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    cname: {
        type:String,
        required:[true,"Name is required"]
    },
    cemail: {
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    cmobile: {
        type:String,
        required:[true,"Mobile is required"]
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
        type:String,
        required:[true,"Pin code is required"]
    },
    cphoto: {
        type:String,
       // required:[true,"Photo is required"]
    },
    cpassword:{
        type:String,
        required:[true,"Password is required"]
    },
    cisBlock: {
        type:Boolean,
        default:false
    }
})

export const Customer = mongoose.model("Customer",customerSchema);