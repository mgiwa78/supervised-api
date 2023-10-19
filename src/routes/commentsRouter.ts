import { Router } from "express";

import { hasPermission } from "../middleware/has-permission";
import { AuthenticateUser } from "../middleware/require-auth";
import { Delete__COMMENT__DELETE } from "../controllers/Comment-Controller";

const commentsRouter = Router();

commentsRouter.delete("/:commentID", AuthenticateUser, Delete__COMMENT__DELETE);

export default commentsRouter;
