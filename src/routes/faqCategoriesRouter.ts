import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import { hasPermission } from "../middleware/has-permission";
import {
  Create__FAQCATEGORIES__POST,
  Fetch__FAQCATEGORIES__GET
} from "../controllers/Faq-Categories-Controller";

const faqCategoriesRouter: Router = Router();

faqCategoriesRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createFaqCategory"),
  Create__FAQCATEGORIES__POST
);

faqCategoriesRouter.get("/", AuthenticateUser, Fetch__FAQCATEGORIES__GET);

export default faqCategoriesRouter;
