"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workflow_Controller_1 = require("../controllers/Workflow-Controller");
const workflowRouter = (0, express_1.Router)();
workflowRouter.get("/", Workflow_Controller_1.Fetch__WORKFLOW__GET);
workflowRouter.post("/", Workflow_Controller_1.Create__WORKFLOW__POST);
workflowRouter.delete("/:workflowId", Workflow_Controller_1.Delete__WORKFLOW__DELETE);
workflowRouter.put("/:workflowId", Workflow_Controller_1.Update__WORKFLOW__PUT);
exports.default = workflowRouter;
//# sourceMappingURL=workflowRouter.js.map