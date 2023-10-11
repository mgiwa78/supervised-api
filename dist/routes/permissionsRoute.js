"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Permission_Controller_1 = require("../controllers/Permission-Controller");
const express_validator_1 = require("express-validator");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const permissionsRouter = (0, express_1.Router)();
permissionsRouter.get("/", Permission_Controller_1.Fetch__PERMISSIONS__GET);
permissionsRouter.get("/withUsers", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("permissionsWithRoles"), Permission_Controller_1.Fetch__PERMISSIONS_WITH_ROLES__GET);
permissionsRouter.post("/", [(0, express_validator_1.body)("name").notEmpty().withMessage("Permission name is required")], Permission_Controller_1.Create__PERMISSION__POST);
exports.default = permissionsRouter;
//# sourceMappingURL=permissionsRoute.js.map