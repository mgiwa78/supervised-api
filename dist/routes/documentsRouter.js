"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const require_auth_1 = require("../middleware/require-auth");
const Document_Controller_1 = require("../controllers/Document-Controller");
const has_permission_1 = require("../middleware/has-permission");
const documentRouter = (0, express_1.Router)();
documentRouter.get("/", Document_Controller_1.Fetch__DOCUMENTS__GET);
documentRouter.get("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetchOwnDocuments"), Document_Controller_1.Fetch__MY_DOCUMENTS__GET);
documentRouter.get("/:documentID", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetchOwnDocument"), Document_Controller_1.Fetch__MY_DOCUMENT__GET);
documentRouter.post("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Document name is required"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("Document description is required"),
    (0, express_validator_1.body)("content").notEmpty().withMessage("Document content is required")
], require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("createDocument"), Document_Controller_1.Create__DOCUMENT__POST);
documentRouter.put("/:documentID", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Document name is required"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("Document description is required"),
    (0, express_validator_1.body)("content").notEmpty().withMessage("Document content is required")
], require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("updateOwnDocument"), Document_Controller_1.Update__DOCUMENT__PUT);
exports.default = documentRouter;
//# sourceMappingURL=documentsRouter.js.map