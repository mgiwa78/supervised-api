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

const workflowRouter: Router = Router();

workflowRouter.get("/", Fetch__WORKFLOW__GET);
workflowRouter.post("/", Create__WORKFLOW__POST);

workflowRouter.delete("/:workflowId", Delete__WORKFLOW__DELETE);
workflowRouter.put("/:workflowId", Update__WORKFLOW__PUT);

export default workflowRouter;
