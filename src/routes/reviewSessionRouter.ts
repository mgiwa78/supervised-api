import { Router } from "express";

import { body } from "express-validator";

import { AuthenticateUser } from "../middleware/require-auth";
import {
  COMMENT_ON__REVIEWSESSION__POST,
  Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET,
  INITIALIZE_A_REVIEWSESSION__POST
} from "../controllers/ReviewSession-Controller";
import { hasPermission } from "../middleware/has-permission";
// import { uploadDocumentForConvertion } from "../middleware/multer";

const path = require("path");
const reviewSessionRouter: Router = Router();

reviewSessionRouter.post(
  "/comment/:reviewSessionId",
  COMMENT_ON__REVIEWSESSION__POST
);
reviewSessionRouter.post("/initialize", INITIALIZE_A_REVIEWSESSION__POST);

reviewSessionRouter.get(
  "/",
  AuthenticateUser,
  // hasPermission("getReviewSession"),
  Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET
);

export default reviewSessionRouter;
