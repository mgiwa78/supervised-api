import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app";
import { MONGO_URI } from "./__CONSTANTS__";
import { User } from "./models";
import { Role } from "./models/role";
const port = 6001;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key dose not exist");
  }
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error("Stufff", error);
  }

  app.listen(port, () => {
    console.log(`Main Route on ${port}!!!!`);
  });
};

start();
