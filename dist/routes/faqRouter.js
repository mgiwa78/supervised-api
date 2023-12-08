"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const Faq_Controller_1 = require("../controllers/Faq-Controller");
const faqRouter = (0, express_1.Router)();
faqRouter.post("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createFaq"), Faq_Controller_1.Create__FAQ__POST);
faqRouter.delete("/:faqId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("deleteFaq"), Faq_Controller_1.Delete__FAQ__DELETE);
faqRouter.put("/:faqId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("UpdateFaq"), Faq_Controller_1.Update__FAQ__PUT);
faqRouter.get("/", require_auth_1.AuthenticateUser, Faq_Controller_1.Fetch__FAQS__GET);
exports.default = faqRouter;
//# sourceMappingURL=faqRouter.js.map