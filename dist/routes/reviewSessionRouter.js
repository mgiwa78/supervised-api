"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const ReviewSession_Controller_1 = require("../controllers/ReviewSession-Controller");
// import { uploadDocumentForConvertion } from "../middleware/multer";
const path = require("path");
const reviewSessionRouter = (0, express_1.Router)();
reviewSessionRouter.post("/comment/:reviewSessionId", require_auth_1.AuthenticateUser, ReviewSession_Controller_1.COMMENT_ON__REVIEWSESSION__POST);
reviewSessionRouter.post("/initialize", ReviewSession_Controller_1.INITIALIZE_A_REVIEWSESSION__POST);
reviewSessionRouter.get("/:reviewSessionId", require_auth_1.AuthenticateUser, 
// hasPermission("getReviewSession"),
ReviewSession_Controller_1.Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET);
reviewSessionRouter.get("/byDocument/:documentId", require_auth_1.AuthenticateUser, 
// hasPermission("getReviewSession"),
ReviewSession_Controller_1.Fetch_BY_DOCUMENT_ID_REVIEWSESSION_FOR_SUPERVISOR__GET);
reviewSessionRouter.put("/:reviewSessionId", require_auth_1.AuthenticateUser, 
// hasPermission("getReviewSession"),
ReviewSession_Controller_1.Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT);
reviewSessionRouter.get("/", require_auth_1.AuthenticateUser, 
// hasPermission("getReviewSession"),
ReviewSession_Controller_1.Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET);
reviewSessionRouter.get("/student/myReview", require_auth_1.AuthenticateUser, 
// hasPermission("getReviewSession"),
ReviewSession_Controller_1.Fetch__REVIEWSESSION_FOR_STUDENT__GET);
exports.default = reviewSessionRouter;
//# sourceMappingURL=reviewSessionRouter.js.map