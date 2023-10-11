"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Role_Controller_1 = require("../controllers/Role-Controller");
const express_validator_1 = require("express-validator");
const has_permission_1 = require("../middleware/has-permission");
const require_auth_1 = require("../middleware/require-auth");
const rolesRouter = (0, express_1.Router)();
rolesRouter.get("/", Role_Controller_1.Fetch__ROLES__GET);
rolesRouter.get("/withUsers", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("viewRolesWithUsers"), Role_Controller_1.Fetch__ROLES_WITH_USERS__GET);
rolesRouter.post("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Role name is required"),
    (0, express_validator_1.body)("permissions")
        .isArray({ min: 1 })
        .withMessage("At least one permission is required")
], require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createNewRole"), Role_Controller_1.Create__ROLES__POST);
rolesRouter.put("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("updateRoles"), Role_Controller_1.Update__ROLES__PUT);
exports.default = rolesRouter;
//# sourceMappingURL=rolesRouter.js.map