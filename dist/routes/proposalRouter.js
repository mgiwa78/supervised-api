"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const Proposal_Controller_1 = require("../controllers/Proposal-Controller");
const proposalRouter = (0, express_1.Router)();
proposalRouter.post("/", require_auth_1.AuthenticateUser, Proposal_Controller_1.Create__PROPOSAL__POST);
proposalRouter.get("/", require_auth_1.AuthenticateUser, Proposal_Controller_1.Fetch__USER__PROPOSAL__GET);
proposalRouter.get("/submitted", require_auth_1.AuthenticateUser, Proposal_Controller_1.Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET);
proposalRouter.post("/approve", require_auth_1.AuthenticateUser, Proposal_Controller_1.PUT_APPROVE_PROPOSAL__POST);
proposalRouter.get("/:proposalId", require_auth_1.AuthenticateUser, Proposal_Controller_1.Fetch__PROPOSAL__GET);
proposalRouter.put("/:proposalId", require_auth_1.AuthenticateUser, Proposal_Controller_1.Upload__PROPOSAL_FILE__PUT);
proposalRouter.get("/student/dashboardData", require_auth_1.AuthenticateUser, Proposal_Controller_1.Fetch__STUDENT_DASHBOARD_DATA__GET);
exports.default = proposalRouter;
//# sourceMappingURL=proposalRouter.js.map