"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Notification_Controller_1 = require("../controllers/Notification-Controller");
const notificationRouter = (0, express_1.Router)();
notificationRouter.get("/send", Notification_Controller_1.Send__NOTIFICATION__POST);
notificationRouter.post("/", Notification_Controller_1.Send__NOTIFICATION__POST);
notificationRouter.get("/", Notification_Controller_1.Get__NOTIFICATION__GET);
exports.default = notificationRouter;
//# sourceMappingURL=notificationRouter.js.map