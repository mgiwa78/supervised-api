import express from "express";
import {
  Fetch__USERS__GET,
  Update__USER__PUT,
  Update__OWN_USER__PUT,
  Delete__USER__DELETE,
  Create__USER__POST,
  Fetch__USER__GET,
  Fetch__SUPERVISORS__GET,
  Fetch__STUDENTS__GET
} from "../controllers/User-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { hasPermission } from "../middleware/has-permission";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("department").notEmpty().withMessage("Department is required"),
    body("roles")
      .isArray({ min: 1 })
      .withMessage("At least one role is required")
  ],
  // AuthenticateUser,
  // hasPermission("post"),
  Create__USER__POST
);

router.get(
  "/",
  AuthenticateUser,
  hasPermission("getAllUsers"),
  Fetch__USERS__GET
);
router.get(
  "/supervisors",
  AuthenticateUser,
  // hasPermission("getAllUsers"),
  Fetch__SUPERVISORS__GET
);
router.get(
  "/students",
  AuthenticateUser,
  // hasPermission("getAllUsers"),
  Fetch__STUDENTS__GET
);
router.get(
  "/:userId",
  AuthenticateUser,
  hasPermission("getAllUsers"),
  Fetch__USER__GET
);

router.put(
  "/:userId",
  AuthenticateUser,
  hasPermission("Users.Edit"),
  Update__USER__PUT
);

router.put(
  "/profile",
  AuthenticateUser,
  hasPermission("put"),
  Update__OWN_USER__PUT
);

router.delete(
  "/:id",
  AuthenticateUser,
  hasPermission("delete"),
  Delete__USER__DELETE
);

export default router;
