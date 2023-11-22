"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const Workflow_Controller_1 = require("../controllers/Workflow-Controller");
const has_permission_1 = require("../middleware/has-permission");
const workflowRouter = (0, express_1.Router)();
workflowRouter.get("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createWorkflow"), Workflow_Controller_1.Fetch__WORKFLOW__GET);
workflowRouter.post("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createWorkflow"), Workflow_Controller_1.Create__WORKFLOW__POST);
workflowRouter.delete("/:workflowId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createWorkflow"), Workflow_Controller_1.Delete__WORKFLOW__DELETE);
workflowRouter.put("/:workflowId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createWorkflow"), Workflow_Controller_1.Update__WORKFLOW__PUT);
exports.default = workflowRouter;
//# sourceMappingURL=workflowRouter.js.map