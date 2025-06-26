import { connect } from "mongoose";
import { configEnv } from "../config/config.js";

export const connectDb = async () => {
  try {
    await connect(configEnv.MONGO_URL);
    console.log(`Connected DB`);
  } catch (error) {
    console.log(error);
  }
};
