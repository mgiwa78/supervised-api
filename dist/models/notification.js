"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    linkType: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
});
NotificationSchema.set("timestamps", true);
const Notification = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Notification) ||
    mongoose_1.default.model("Notification", NotificationSchema));
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map