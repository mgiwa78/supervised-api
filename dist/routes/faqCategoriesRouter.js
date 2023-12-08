"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const Faq_Categories_Controller_1 = require("../controllers/Faq-Categories-Controller");
const faqCategoriesRouter = (0, express_1.Router)();
faqCategoriesRouter.post("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createFaqCategory"), Faq_Categories_Controller_1.Create__FAQCATEGORIES__POST);
faqCategoriesRouter.delete("/:faqCategoryId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("deleteFaqCategory"), Faq_Categories_Controller_1.Delete__FAQCATEGORIES__DELETE);
faqCategoriesRouter.put("/:faqCategoryId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("updateFaqCategory"), Faq_Categories_Controller_1.Update__FAQCATEGORIES__PUT);
faqCategoriesRouter.get("/", require_auth_1.AuthenticateUser, Faq_Categories_Controller_1.Fetch__FAQCATEGORIES__GET);
exports.default = faqCategoriesRouter;
//# sourceMappingURL=faqCategoriesRouter.js.map