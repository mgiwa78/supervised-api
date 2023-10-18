import { Router } from "express";

import { body } from "express-validator";

import { AuthenticateUser } from "../middleware/require-auth";
import {
  CONVERT_CONTENT_TO_WORD_GET,
  Create__DOCUMENT__POST,
  Fetch__DOCUMENTS__GET,
  Fetch__MY_DOCUMENTS__GET,
  Fetch__MY_DOCUMENT__GET,
  Update__DOCUMENT__PUT
} from "../controllers/Document-Controller";
import { hasPermission } from "../middleware/has-permission";
// import { uploadDocumentForConvertion } from "../middleware/multer";

const path = require("path");
const documentRouter: Router = Router();

documentRouter.get("/", AuthenticateUser, Fetch__DOCUMENTS__GET);

documentRouter.post("/convertToWord", CONVERT_CONTENT_TO_WORD_GET);

documentRouter.get(
  "/",
  AuthenticateUser,
  hasPermission("fetchOwnDocuments"),
  Fetch__MY_DOCUMENTS__GET
);

documentRouter.get(
  "/:documentID",
  AuthenticateUser,
  hasPermission("fetchOwnDocument"),
  Fetch__MY_DOCUMENT__GET
);
documentRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createDocument"),
  Create__DOCUMENT__POST
);
documentRouter.put(
  "/:documentID",
  [
    body("name").notEmpty().withMessage("Document name is required"),
    body("description")
      .notEmpty()
      .withMessage("Document description is required"),
    body("content").notEmpty().withMessage("Document content is required")
  ],
  AuthenticateUser,
  hasPermission("updateOwnDocument"),
  Update__DOCUMENT__PUT
);

export default documentRouter;
