import { Router } from "express";
import {
  Fetch__ROLES__GET,
  Create__ROLES__POST,
  Fetch__ROLES_WITH_USERS__GET,
  Update__ROLES__PUT
} from "../controllers/Role-Controller";
import { body } from "express-validator";
import { hasPermission } from "../middleware/has-permission";
import { AuthenticateUser } from "../middleware/require-auth";

const rolesRouter = Router();

rolesRouter.get("/", Fetch__ROLES__GET);
rolesRouter.get(
  "/withUsers",
  AuthenticateUser,
  hasPermission("viewRolesWithUsers"),
  Fetch__ROLES_WITH_USERS__GET
);
rolesRouter.post(
  "/",
  [
    body("name").notEmpty().withMessage("Role name is required"),
    body("permissions")
      .isArray({ min: 1 })
      .withMessage("At least one permission is required")
  ],
  AuthenticateUser,
  hasPermission("createNewRole"),
  Create__ROLES__POST
);
rolesRouter.put(
  "/",
  AuthenticateUser,
  hasPermission("updateRoles"),
  Update__ROLES__PUT
);

export default rolesRouter;
