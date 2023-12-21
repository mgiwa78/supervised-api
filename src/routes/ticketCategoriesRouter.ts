import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Create__TICKET_CATEGORIES__POST,
  Fetch__TICKET_CATEGORIES__GET,
  Delete__TICKET_CATEGORIES__DELETE,
  Update__TICKET_CATEGORIES__PUT
} from "../controllers/Ticket-Categories-Controller";

const ticketCategoriesRouter: Router = Router();

ticketCategoriesRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createFaqCategory"),
  Create__TICKET_CATEGORIES__POST
);
ticketCategoriesRouter.delete(
  "/:faqCategoryId",
  AuthenticateUser,
  hasPermission("deleteFaqCategory"),
  Delete__TICKET_CATEGORIES__DELETE
);
ticketCategoriesRouter.put(
  "/:faqCategoryId",
  AuthenticateUser,
  hasPermission("updateFaqCategory"),
  Update__TICKET_CATEGORIES__PUT
);

ticketCategoriesRouter.get(
  "/",
  AuthenticateUser,
  Fetch__TICKET_CATEGORIES__GET
);

export default ticketCategoriesRouter;
