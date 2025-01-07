import { Review } from "../models/ReviewSchema.js";

const addReview = async (req, res) => {
  console.log(req.body);
  try {
    const addedreview = await Review.create(req.body);
    res.status(200).json(addedreview);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getallReview = async (req, res) => {
  try {
    const review = await Review.find()
      .populate("customerid")
      .populate("dishid");
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const DeleteReview = async (req, res) => {
  try {
    const deletereview = await Review.findByIdAndDelete(req.body);
    req.status(200).json(deletereview);
  } catch (error) {
    res.status(500).json(error);
  }
};

const UpdateReview = async (req, res) => {
  try {
    const updatereview = await Review.findByIdAndUpdate(
      { _id: req.body.reviewid },
      { Comment: req.body.Comment, Rating: req.body.Rating },
      { new: true }
    );
    res.status(200).json(updatereview);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { addReview, getallReview, DeleteReview, UpdateReview };
