"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const Ticket_Response_Controller_1 = require("../controllers/Ticket-Response-Controller");
const ticketResponseRouter = (0, express_1.Router)();
ticketResponseRouter.post("/", require_auth_1.AuthenticateUser, Ticket_Response_Controller_1.Create__TICKET_RESPONSE__POST);
ticketResponseRouter.delete("/:ticketResponseId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("deleteFaq"), Ticket_Response_Controller_1.Delete__TICKET_RESPONSE__DELETE);
ticketResponseRouter.put("/:ticketId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("UpdateFaq"), Ticket_Response_Controller_1.Update__TICKET_RESPONSE__PUT);
ticketResponseRouter.get("/:ticketId", require_auth_1.AuthenticateUser, Ticket_Response_Controller_1.Fetch__TICKET_RESPONSES__GET);
exports.default = ticketResponseRouter;
//# sourceMappingURL=ticketResponse.js.map