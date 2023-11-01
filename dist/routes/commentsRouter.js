"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const Comment_Controller_1 = require("../controllers/Comment-Controller");
const commentsRouter = (0, express_1.Router)();
commentsRouter.delete("/:commentID/:reviewSessionId", require_auth_1.AuthenticateUser, Comment_Controller_1.Delete__COMMENT__DELETE);
exports.default = commentsRouter;
//# sourceMappingURL=commentsRouter.js.map