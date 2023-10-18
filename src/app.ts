import express from "express";
import bodyParser, { json } from "body-parser";

import cookieSession from "cookie-session";
import "express-async-errors";
import cors from "cors";
import rootRouter from "./routes/rootRouter";
import { errorHandler } from "./middleware/error-handlers";
import { NotFoundError } from "./errors/not-found-error";
import { Permission } from "./models/permission";

const app = express();

const whitelist = [
  "http://localhost:3012",
  "http://localhost:3011",
  "https://supervised-client.vercel.app",
  "https://supervised-client.vercel.app/",
  "http://localhost:3013"
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
app.use("/uploads/docs", express.static("uploads/docs"));

app.use(cors(corsOptions));
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(json());

// app.use(
//   cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
// );

app.use(rootRouter);

// app.all("*", async (req, res, next) => {
//   nsext(new NotFoundError());
// });

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
