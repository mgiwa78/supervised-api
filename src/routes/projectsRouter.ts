import { Router } from "express";

import { body } from "express-validator";

import { AuthenticateUser } from "../middleware/require-auth";
import {
  Create__PROJECTS__POST,
  Delete__FILE__DELETE,
  Fetch__ALL_PROJECTS__GET,
  Fetch__PROJECT_ASSIGNED__GET,
  Fetch__PROJECT__GET,
  Fetch__STUDENT__PROJECTS__GET,
  Fetch__USER_DASHBOARD_DATA__GET,
  Fetch__USER__PROJECTS__GET,
  Upload__PROJECT_DOCUMENT__PUT
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

projectRouter.delete(
  "/:projectId/:fileId",
  AuthenticateUser,
  Delete__FILE__DELETE
);

projectRouter.get(
  "/student/review/:studentId",
  AuthenticateUser,
  Fetch__STUDENT__PROJECTS__GET
);

projectRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createProject"),
  Create__PROJECTS__POST
);
projectRouter.put(
  "/uploadDocument/:projectId",
  AuthenticateUser,
  // hasPermission("uploadDocument"),
  Upload__PROJECT_DOCUMENT__PUT
);
projectRouter.get(
  "/student/dashboardData",
  AuthenticateUser,
  // hasPermission("uploadDocument"),
  Fetch__USER_DASHBOARD_DATA__GET
);

export default projectRouter;
