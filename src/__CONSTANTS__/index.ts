require("dotenv").config();

const EMAIL = "mgiwa78@gmail.com";
const PASSWORD = "rsdaxgcljgxyfgzj";
const JWT_SECRET = "sdsdfo8y2jkfbdfsdf";

process.env.NODE_ENV === "development";

// const MONGO_URI = "mongodb://127.0.0.1:27017/show-room";

// "mongodb+srv://vercel-admin-user:TpcUDU37xA5JroSR@cluster0.za7xrpe.mongodb.net/supervised?retryWrites=true&w=majority"

const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/supervised"
    : "mongodb+srv://vercel-admin-user:TpcUDU37xA5JroSR@cluster0.za7xrpe.mongodb.net/supervised";

console.log(MONGO_URI);
export { EMAIL, PASSWORD, JWT_SECRET, MONGO_URI };
