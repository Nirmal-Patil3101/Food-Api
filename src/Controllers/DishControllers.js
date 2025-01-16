import { Dish } from "../models/DishSchema.js";

const adddish = async (req, res) => {
  console.log(req.body);
  try {
    let filePath = req.file.path.replace(/\\/g, "/");
    const addeddish = await Dish.create({ ...req.body, dimg: filePath });
    res.status(200).json(addeddish);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getallDish = async (req, res) => {
  try {
    const dish = await Dish.find();
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletedish = async (req, res) => {
  try {
    let dishid = req.body.dishid;
    const deleteddish = await Dish.findByIdAndDelete(dishid);
    res.status(200).json(deleteddish);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatedish = async (req, res) => {
  try {
    let updateddish = await Dish.findByIdAndUpdate(
      { _id: req.body.dishid },
      { dprice: req.body.dprice },
      { new: true }
    );
    res.status(200).json(updateddish);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDishesWithAvgRating = async (req, res) => {
  try {

      // const AverageRating = await Reviews.aggregate([
      //     {
      //         $group: {
      //             _id: "$dishid",
      //             averageratings: { $avg: "$Rating" }
      //         }
      //     }
      // ]);

      // const populatedReviews= await Dish.populate(AverageRating,{path:'_id'})

      const populatedDishes = await Dish.aggregate([
          {
              $lookup: {
                  from: 'reviews', // Join with the Reviews collection
                  localField: '_id', // Match DishId (from Dishes collection)
                  foreignField: 'dishid', // Match DishId (from Reviews collection)
                  as: 'reviews' // The alias for the populated data
              }
          },

          {
              $addFields: {
                  averageratings: {
                      $cond: {
                          if: { $gt: [{ $size: "$reviews" }, 0] }, // If there are reviews
                          then: { $avg: "$reviews.Rating" }, // Calculate average rating
                          else: 0 // Else set average rating to 0
                      }
                  }
              }
          },
          {
              $project: {
                  _id: 1,
                  dname: 1, // Include other fields from the Dishes collection (e.g., name)
                  dprice: 1,
                  dtype: 1,
                  dcategory: 1,
                  dimg: 1,
                  disavailable: 1,
                  averageratings: 1
              }
          }
      ]);

      res.status(200).json({ data: populatedDishes })
  } catch (error) {
      res.status(200).json(error)
  }
}

export { adddish, getallDish, deletedish, updatedish , getDishesWithAvgRating};
