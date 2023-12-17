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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const notification_1 = require("../models/notification");
const sendLoginDetectedMail_1 = __importDefault(require("../services/mail/sendLoginDetectedMail"));
const sendProjectApprovalMail_1 = __importDefault(require("../services/mail/sendProjectApprovalMail"));
const isProjectApproval = (data) => {
    return (data &&
        typeof data.project !== "undefined" &&
        typeof data.student !== "undefined");
};
const isLogin = (data) => {
    return data && typeof data.user !== "undefined";
};
const sendNotification = (type, data) => __awaiter(void 0, void 0, void 0, function* () {
    switch (type) {
        case "PROJECT_APPROVAL":
            if (isProjectApproval(data)) {
                const message = {
                    title: "Project Approved",
                    message: "Your project : ${project.title}, has been approved",
                    color: "primary",
                    linkType: "project",
                    user: data.student._id
                };
                yield notification_1.Notification.create(message);
                if (data.student.notification.email) {
                    yield (0, sendProjectApprovalMail_1.default)(data.student, data.project);
                }
            }
            break;
        case "LOGIN_DETECTED":
            if (isLogin(data)) {
                const message = {
                    title: "Login Activity",
                    message: "Your account was accessed",
                    color: "primary",
                    linkType: "none",
                    user: data.user._id
                };
                yield notification_1.Notification.create(message);
                if (data.user.notification.email) {
                    yield (0, sendLoginDetectedMail_1.default)(data.user, data.dateAndTime);
                }
            }
            break;
        default:
            break;
    }
});
exports.sendNotification = sendNotification;
//# sourceMappingURL=notification.js.map