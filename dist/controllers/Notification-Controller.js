"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mark_as_read__NOTIFICATION__POST = exports.Get__NOTIFICATION__GET = exports.Send__NOTIFICATION = exports.Send__NOTIFICATION__POST = void 0;
const notification_1 = require("../models/notification");
const Send__NOTIFICATION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notification_1.Notification.create({
            user: "651d4619691c3cc837388baa",
            title: "title",
            message: "message"
        });
        const notifications = yield notification_1.Notification.find().sort({ createdAt: -1 });
        res.status(201).json(notification);
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Send__NOTIFICATION__POST = Send__NOTIFICATION__POST;
const Send__NOTIFICATION = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notification_1.Notification.create({
            user: userID,
            title: "title",
            message: "message"
        });
        return notification;
    }
    catch (error) {
        console.log(error);
    }
});
exports.Send__NOTIFICATION = Send__NOTIFICATION;
const Get__NOTIFICATION__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notification_1.Notification.find({ user: req.user.id }).sort({
            createdAt: -1
        });
        console.log(notifications);
        return res.json({ status: "success", data: notifications });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Get__NOTIFICATION__GET = Get__NOTIFICATION__GET;
const Mark_as_read__NOTIFICATION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { userId } = req.params;
        // console.log(userId);
        yield notification_1.Notification.updateMany({ user: req.user.id, status: false }, { $set: { status: true } });
        const notifications = yield notification_1.Notification.find({ user: req.user.id });
        return res.json({ status: "success", data: notifications });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Mark_as_read__NOTIFICATION__POST = Mark_as_read__NOTIFICATION__POST;
//# sourceMappingURL=Notification-Controller.js.map