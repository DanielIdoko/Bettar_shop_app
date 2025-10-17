import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.config.js";

const connectToDb = async (params) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to db in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

export default connectToDb;