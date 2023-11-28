"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const Faq_Controller_1 = require("../controllers/Faq-Controller");
const faqRouter = (0, express_1.Router)();
faqRouter.post("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createFaq"), Faq_Controller_1.Create__FAQ__POST);
faqRouter.get("/", require_auth_1.AuthenticateUser, Faq_Controller_1.Fetch__FAQS__GET);
exports.default = faqRouter;
//# sourceMappingURL=faqRouter.js.map