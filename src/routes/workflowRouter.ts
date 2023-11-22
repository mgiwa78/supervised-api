import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";
import {
  Create__WORKFLOW__POST,
  Delete__WORKFLOW__DELETE,
  Fetch__WORKFLOW__GET,
  Update__WORKFLOW__PUT
} from "../controllers/Workflow-Controller";
import { hasPermission } from "../middleware/has-permission";

const workflowRouter: Router = Router();

workflowRouter.get(
  "/",
  AuthenticateUser,
  hasPermission("createWorkflow"),
  Fetch__WORKFLOW__GET
);
workflowRouter.post(
  "/",
  AuthenticateUser,
  hasPermission("createWorkflow"),
  Create__WORKFLOW__POST
);

workflowRouter.delete(
  "/:workflowId",
  AuthenticateUser,
  hasPermission("createWorkflow"),
  Delete__WORKFLOW__DELETE
);
workflowRouter.put(
  "/:workflowId",
  AuthenticateUser,
  hasPermission("createWorkflow"),
  Update__WORKFLOW__PUT
);

export default workflowRouter;
