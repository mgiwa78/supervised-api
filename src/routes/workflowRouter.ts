import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";
import {
  Create__WORKFLOW__POST,
  Fetch__WORKFLOW__GET
} from "../controllers/Workflow-Controller";

const workflowRouter: Router = Router();

workflowRouter.get("/", Fetch__WORKFLOW__GET);
workflowRouter.post("/", Create__WORKFLOW__POST);

export default workflowRouter;
