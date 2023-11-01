import { Router } from "express";

import { body } from "express-validator";

import { AuthenticateUser } from "../middleware/require-auth";
import {
  Create__PROJECTS__POST,
  Fetch__ALL_PROJECTS__GET,
  Fetch__PROJECT_ASSIGNED__GET,
  Fetch__PROJECT__GET,
  Fetch__STUDENT__PROJECTS__GET,
  Fetch__USER__PROJECTS__GET
} from "../controllers/Project-Controller";
import { hasPermission } from "../middleware/has-permission";

const path = require("path");

const projectRouter: Router = Router();

projectRouter.get("/my", AuthenticateUser, Fetch__USER__PROJECTS__GET);
projectRouter.get("/", AuthenticateUser, Fetch__ALL_PROJECTS__GET);
projectRouter.get("/:projectId", AuthenticateUser, Fetch__PROJECT__GET);
projectRouter.get(
  "/supervisor/assigned",
  AuthenticateUser,
  Fetch__PROJECT_ASSIGNED__GET
);

projectRouter.get(
  "/ofStudent/:studentId",
  AuthenticateUser,
  Fetch__STUDENT__PROJECTS__GET
);

projectRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createDocument"),
  Create__PROJECTS__POST
);

export default projectRouter;
