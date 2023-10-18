import "dotenv/config";
import { connect } from "mongoose";
import { app } from "./app";
import { MONGO_URI } from "./__CONSTANTS__";
import { User } from "./models";
import { Role } from "./models/role";
import { MongoClient } from "mongodb";
const port = 6001;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key dose not exist");
  }
  try {
    const client = await new MongoClient(MONGO_URI);

    await client.connect();
  } catch (error) {
    console.error("Stufff", error);
  }

  app.listen(port, () => {
    console.log(`Main Route on ${port}!!!!`);
  });
};

start();
