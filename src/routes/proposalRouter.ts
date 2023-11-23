import { Router } from "express";

import { hasPermission } from "../middleware/has-permission";
import { AuthenticateUser } from "../middleware/require-auth";
import {
  Create__PROPOSAL__POST,
  Fetch__PROPOSAL__GET,
  Fetch__STUDENT_DASHBOARD_DATA__GET,
  Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET,
  Fetch__USER__PROPOSAL__GET,
  PUT_APPROVE_PROPOSAL__POST,
  Upload__PROPOSAL_FILE__PUT
} from "../controllers/Proposal-Controller";

const proposalRouter = Router();

proposalRouter.post("/", AuthenticateUser, Create__PROPOSAL__POST);
proposalRouter.get("/", AuthenticateUser, Fetch__USER__PROPOSAL__GET);

proposalRouter.get(
  "/submitted",
  AuthenticateUser,
  Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET
);
proposalRouter.post("/approve", AuthenticateUser, PUT_APPROVE_PROPOSAL__POST);

proposalRouter.get("/:proposalId", AuthenticateUser, Fetch__PROPOSAL__GET);
proposalRouter.put(
  "/:proposalId",
  AuthenticateUser,
  Upload__PROPOSAL_FILE__PUT
);

proposalRouter.get(
  "/student/dashboardData",
  AuthenticateUser,
  Fetch__STUDENT_DASHBOARD_DATA__GET
);
export default proposalRouter;
