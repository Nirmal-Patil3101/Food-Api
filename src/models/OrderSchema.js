import mongoose from "mongoose";

const orderSchema =mongoose.Schema({
  orderDate:{
    type:Date,
    required:[true,"Order Date"],
    default:new Date(),
  },
  orderTotal:{
    type:Number,
    required:[true,"Order Total"]
  },
  orderNoofItem:{
    type:Number,
    required:[true,"Order Item"]
  },
  ordercustomerid:{
    type:mongoose.Types.ObjectId,
    ref:"Customer",
    required:[true,"Customer Id"],
  },
  // customerreviews:[
  //   {
  //     customerid:{type:mongoose.Types.ObjectId,ref:"Customer"},
  //     Rating:Number,
  //     comment:object
  //   }
  // ],
  orderdishid:{
    type:mongoose.Types.ObjectId,
    ref:"Dish",
    required:[true,"dish id"],
    
  },
  orderStatus:{
    type:String,
    required:[true,"Order Status"],
    default:"Pending",
  }  
})

export const Order = mongoose.model("Order",orderSchema);