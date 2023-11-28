import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Create__FAQ__POST,
  Fetch__FAQS__GET
} from "../controllers/Faq-Controller";

const faqRouter: Router = Router();

faqRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createFaq"),
  Create__FAQ__POST
);

faqRouter.get("/", AuthenticateUser, Fetch__FAQS__GET);

export default faqRouter;
