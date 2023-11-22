"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const State_Controller_1 = require("../controllers/State-Controller");
const has_permission_1 = require("../middleware/has-permission");
const stateRouter = (0, express_1.Router)();
stateRouter.post("/:workflowId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createWorkflowState"), State_Controller_1.Create__STATE__POST);
exports.default = stateRouter;
//# sourceMappingURL=stateRouter.js.map