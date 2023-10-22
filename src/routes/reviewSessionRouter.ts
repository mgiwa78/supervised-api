import { Router } from "express";

import { body } from "express-validator";

import { AuthenticateUser } from "../middleware/require-auth";
import {
  COMMENT_ON__REVIEWSESSION__POST,
  Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET,
  Fetch__REVIEWSESSION_FOR_STUDENT__GET,
  Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET,
  INITIALIZE_A_REVIEWSESSION__POST,
  Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT
} from "../controllers/ReviewSession-Controller";
import { hasPermission } from "../middleware/has-permission";
// import { uploadDocumentForConvertion } from "../middleware/multer";

const path = require("path");
const reviewSessionRouter: Router = Router();

reviewSessionRouter.post(
  "/comment/:reviewSessionId",
  AuthenticateUser,
  COMMENT_ON__REVIEWSESSION__POST
);
reviewSessionRouter.post("/initialize", INITIALIZE_A_REVIEWSESSION__POST);

reviewSessionRouter.get(
  "/:reviewSessionId",
  AuthenticateUser,
  // hasPermission("getReviewSession"),
  Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET
);
reviewSessionRouter.put(
  "/:reviewSessionId",
  AuthenticateUser,
  // hasPermission("getReviewSession"),
  Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT
);
reviewSessionRouter.get(
  "/",
  AuthenticateUser,
  // hasPermission("getReviewSession"),
  Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET
);
reviewSessionRouter.get(
  "/student/myReview",
  AuthenticateUser,
  // hasPermission("getReviewSession"),
  Fetch__REVIEWSESSION_FOR_STUDENT__GET
);

export default reviewSessionRouter;
