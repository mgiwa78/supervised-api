import { Router } from "express";
import { body } from "express-validator";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Create__TICKET_RESPONSE__POST,
  Delete__TICKET_RESPONSE__DELETE,
  Fetch__TICKET_RESPONSES__GET,
  Update__TICKET_RESPONSE__PUT
} from "../controllers/Ticket-Response-Controller";

const ticketResponseRouter: Router = Router();

ticketResponseRouter.post("/", AuthenticateUser, Create__TICKET_RESPONSE__POST);

ticketResponseRouter.delete(
  "/:ticketResponseId",
  AuthenticateUser,
  hasPermission("deleteFaq"),
  Delete__TICKET_RESPONSE__DELETE
);

ticketResponseRouter.put(
  "/:ticketId",
  AuthenticateUser,
  hasPermission("UpdateFaq"),
  Update__TICKET_RESPONSE__PUT
);

ticketResponseRouter.get(
  "/:ticketId",
  AuthenticateUser,
  Fetch__TICKET_RESPONSES__GET
);

export default ticketResponseRouter;
