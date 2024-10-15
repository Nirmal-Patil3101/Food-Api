import mongoose from "mongoose";

const connecToDb= async()=>{
    try {
        const connectiondata = await mongoose.connect("mongodb://localhost:27017/fooddb")
            console.log("Connection Successfull",connectiondata.connection.name);
        } catch (error) {
        console.log(error);
    }
}

export {connecToDb}