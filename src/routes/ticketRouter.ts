import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Create__TICKET__POST,
  Delete__TICKET__DELETE,
  Fetch__TICKETS__GET,
  Update__TICKET__PUT
} from "../controllers/Ticket-Controller";

const ticketRouter: Router = Router();

ticketRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createFaq"),
  Create__TICKET__POST
);
ticketRouter.delete(
  "/:ticketId",
  AuthenticateUser,
  hasPermission("deleteFaq"),
  Delete__TICKET__DELETE
);
ticketRouter.put(
  "/:ticketId",
  AuthenticateUser,
  hasPermission("UpdateFaq"),
  Update__TICKET__PUT
);

ticketRouter.get("/", AuthenticateUser, Fetch__TICKETS__GET);

export default ticketRouter;
