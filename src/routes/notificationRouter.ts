import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Get__NOTIFICATION__GET,
  Mark_as_read__NOTIFICATION__POST,
  Send__NOTIFICATION__POST
} from "../controllers/Notification-Controller";

const notificationRouter: Router = Router();

notificationRouter.get("/send", Send__NOTIFICATION__POST);
notificationRouter.post("/", Send__NOTIFICATION__POST);
notificationRouter.get("/", AuthenticateUser, Get__NOTIFICATION__GET);

notificationRouter.post(
  "/mark-as-read",
  AuthenticateUser,
  Mark_as_read__NOTIFICATION__POST
);

export default notificationRouter;
