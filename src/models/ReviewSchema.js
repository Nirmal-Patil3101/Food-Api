import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
  dishid: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
    required: true,
  },
  customerid: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  ReviewDate: {
    type: Date,
    default: new Date(),
  },
  Comment: {
    type: String,
  },
  Rating: {
    type: Number,
    required: true,
  },
});

export const Review = mongoose.model("Review", ReviewSchema);
