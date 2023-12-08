import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Create__FAQ__POST,
  Delete__FAQ__DELETE,
  Fetch__FAQS__GET,
  Update__FAQ__PUT
} from "../controllers/Faq-Controller";

const faqRouter: Router = Router();

faqRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createFaq"),
  Create__FAQ__POST
);
faqRouter.delete(
  "/:faqId",
  AuthenticateUser,
  hasPermission("deleteFaq"),
  Delete__FAQ__DELETE
);
faqRouter.put(
  "/:faqId",
  AuthenticateUser,
  hasPermission("UpdateFaq"),
  Update__FAQ__PUT
);

faqRouter.get("/", AuthenticateUser, Fetch__FAQS__GET);

export default faqRouter;
