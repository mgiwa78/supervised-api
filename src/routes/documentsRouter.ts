import { Router } from "express";

import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { uploadProducts } from "../middleware/multer";
import { AuthenticateUser } from "../middleware/require-auth";
import {
  Create__DOCUMENT__POST,
  Fetch__DOCUMENTS__GET,
  Fetch__MY_DOCUMENTS__GET,
  Fetch__MY_DOCUMENT__GET,
  Update__DOCUMENT__PUT
} from "../controllers/Document-Controller";
import { hasPermission } from "../middleware/has-permission";

const documentRouter: Router = Router();

documentRouter.get("/", Fetch__DOCUMENTS__GET);
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
  [
    body("name").notEmpty().withMessage("Document name is required"),
    body("description")
      .notEmpty()
      .withMessage("Document description is required"),
    body("content").notEmpty().withMessage("Document content is required")
  ],
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
