"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const Ticket_Categories_Controller_1 = require("../controllers/Ticket-Categories-Controller");
const ticketCategoriesRouter = (0, express_1.Router)();
ticketCategoriesRouter.post("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createFaqCategory"), Ticket_Categories_Controller_1.Create__TICKET_CATEGORIES__POST);
ticketCategoriesRouter.delete("/:faqCategoryId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("deleteFaqCategory"), Ticket_Categories_Controller_1.Delete__TICKET_CATEGORIES__DELETE);
ticketCategoriesRouter.put("/:faqCategoryId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("updateFaqCategory"), Ticket_Categories_Controller_1.Update__TICKET_CATEGORIES__PUT);
ticketCategoriesRouter.get("/", require_auth_1.AuthenticateUser, Ticket_Categories_Controller_1.Fetch__TICKET_CATEGORIES__GET);
exports.default = ticketCategoriesRouter;
//# sourceMappingURL=ticketCategoriesRouter.js.map