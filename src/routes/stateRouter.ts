import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";
import { Create__STATE__POST } from "../controllers/State-Controller";
import { hasPermission } from "../middleware/has-permission";

const stateRouter: Router = Router();

stateRouter.post(
  "/:workflowId",
  AuthenticateUser,
  hasPermission("createWorkflowState"),
  Create__STATE__POST
);

export default stateRouter;
