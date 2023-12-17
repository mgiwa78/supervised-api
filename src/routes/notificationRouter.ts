import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Get__NOTIFICATION__GET,
  Send__NOTIFICATION__POST
} from "../controllers/Notification-Controller";

const notificationRouter: Router = Router();

notificationRouter.get("/send", Send__NOTIFICATION__POST);
notificationRouter.post("/", Send__NOTIFICATION__POST);
notificationRouter.get("/", Get__NOTIFICATION__GET);

export default notificationRouter;
