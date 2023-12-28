"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const Notification_Controller_1 = require("../controllers/Notification-Controller");
const notificationRouter = (0, express_1.Router)();
notificationRouter.get("/send", Notification_Controller_1.Send__NOTIFICATION__POST);
notificationRouter.post("/", Notification_Controller_1.Send__NOTIFICATION__POST);
notificationRouter.get("/", require_auth_1.AuthenticateUser, Notification_Controller_1.Get__NOTIFICATION__GET);
notificationRouter.post("/mark-as-read", require_auth_1.AuthenticateUser, Notification_Controller_1.Mark_as_read__NOTIFICATION__POST);
exports.default = notificationRouter;
//# sourceMappingURL=notificationRouter.js.map