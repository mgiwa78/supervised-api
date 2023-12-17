import { Router } from "express";
import express from "express";

import authRouter from "./auth";
import userRouter from "./usersRouter";

import departmentRouter from "./departmentRouter";
import rolesRouter from "./rolesRouter";
import permissionsRouter from "./permissionsRoute";
import documentRouter from "./documentsRouter";
import reviewSessionRouter from "./reviewSessionRouter";
import commentsRouter from "./commentsRouter";
import projectRouter from "./projectsRouter";
import proposalRouter from "./proposalRouter";
import fileRouter from "./fileRouter";
import workflowRouter from "./workflowRouter";
import stateRouter from "./stateRouter";
import faqCategoriesRouter from "./faqCategoriesRouter";
import faqRouter from "./faqRouter";
import notificationRouter from "./notificationRouter";

let rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Supervised API is online and running");
});

////

rootRouter.use("/auth", authRouter);
rootRouter.use("/reviewSessions", reviewSessionRouter);
rootRouter.use("/roles", rolesRouter);
rootRouter.use("/comments", commentsRouter);
rootRouter.use("/projects", projectRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/departments", departmentRouter);
rootRouter.use("/documents", documentRouter);
rootRouter.use("/workflows", workflowRouter);
rootRouter.use("/proposals", proposalRouter);
rootRouter.use("/permissions", permissionsRouter);
rootRouter.use("/states", stateRouter);
rootRouter.use("/faqCategories", faqCategoriesRouter);
rootRouter.use("/notifications", notificationRouter);
rootRouter.use("/faqs", faqRouter);
rootRouter.use("/files", fileRouter);

export default rootRouter;
