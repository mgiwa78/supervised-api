"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const Project_Controller_1 = require("../controllers/Project-Controller");
const has_permission_1 = require("../middleware/has-permission");
const path = require("path");
const projectRouter = (0, express_1.Router)();
projectRouter.get("/my", require_auth_1.AuthenticateUser, Project_Controller_1.Fetch__USER__PROJECTS__GET);
projectRouter.get("/", require_auth_1.AuthenticateUser, Project_Controller_1.Fetch__ALL_PROJECTS__GET);
projectRouter.get("/:projectId", require_auth_1.AuthenticateUser, Project_Controller_1.Fetch__PROJECT__GET);
projectRouter.get("/supervisor/assigned", require_auth_1.AuthenticateUser, Project_Controller_1.Fetch__PROJECT_ASSIGNED__GET);
projectRouter.get("/ofStudent/:studentId", require_auth_1.AuthenticateUser, Project_Controller_1.Fetch__STUDENT__PROJECTS__GET);
projectRouter.post("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createDocument"), Project_Controller_1.Create__PROJECTS__POST);
exports.default = projectRouter;
//# sourceMappingURL=projectsRouter.js.map