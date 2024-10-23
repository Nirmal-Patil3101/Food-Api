import express from "express";
import bodyParser from "body-parser";
import { connecToDb } from "./src/db/Config.js";
import { router } from "./src/routes/Routes.js";
import cors from "cors";

//create food
const food = express();

connecToDb();
//add bodyparser to food

food.use(cors());
food.use(bodyParser.json());

food.get("/", (req, res) => {
  res.send("Nirmal....");
});

food.post("/add", (req, res) => {
  console.log(req.body);
  res.send("Added..");
});
food.use(router);
food.use("/uploads",express.static("uploads"));

food.listen(5000, () => {
  console.log("Server Started....");
});
