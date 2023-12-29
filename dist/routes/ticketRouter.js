"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const Ticket_Controller_1 = require("../controllers/Ticket-Controller");
const ticketRouter = (0, express_1.Router)();
ticketRouter.post("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createTicket"), Ticket_Controller_1.Create__TICKET__POST);
ticketRouter.delete("/:ticketId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("deleteFaq"), Ticket_Controller_1.Delete__TICKET__DELETE);
ticketRouter.put("/:ticketId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("UpdateFaq"), Ticket_Controller_1.Update__TICKET__PUT);
ticketRouter.get("/", require_auth_1.AuthenticateUser, Ticket_Controller_1.Fetch__TICKETS__GET);
ticketRouter.get("/my", require_auth_1.AuthenticateUser, Ticket_Controller_1.Fetch__MY__TICKETS__GET);
exports.default = ticketRouter;
//# sourceMappingURL=ticketRouter.js.map