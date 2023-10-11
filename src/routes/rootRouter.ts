import { Router } from "express";
import express from "express";

import authRouter from "./auth";
import userRouter from "./usersRouter";

import departmentRouter from "./departmentRouter";
import rolesRouter from "./rolesRouter";
import permissionsRouter from "./permissionsRoute";
import documentRouter from "./documentsRouter";

let rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Supervised API is online and running");
});

////

rootRouter.use("/auth", authRouter);
rootRouter.use("/roles", rolesRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/departments", departmentRouter);
rootRouter.use("/documents", documentRouter);
rootRouter.use("/permissions", permissionsRouter);

export default rootRouter;
