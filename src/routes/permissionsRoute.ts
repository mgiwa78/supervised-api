import { Router } from "express";
import {
  Create__PERMISSION__POST,
  Fetch__PERMISSIONS_WITH_ROLES__GET,
  Fetch__PERMISSIONS__GET
} from "../controllers/Permission-Controller";
import { body } from "express-validator";
import { AuthenticateUser } from "../middleware/require-auth";
import { hasPermission } from "../middleware/has-permission";

const permissionsRouter = Router();

permissionsRouter.get("/", Fetch__PERMISSIONS__GET);
permissionsRouter.get(
  "/withUsers",
  AuthenticateUser,
  hasPermission("permissionsWithRoles"),
  Fetch__PERMISSIONS_WITH_ROLES__GET
);
permissionsRouter.post(
  "/",
  [body("name").notEmpty().withMessage("Permission name is required")],
  Create__PERMISSION__POST
);

export default permissionsRouter;
