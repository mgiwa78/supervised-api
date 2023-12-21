"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TicketSchema = new mongoose_1.default.Schema({
    subject: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "TicketCategories"
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
});
TicketSchema.set("timestamps", true);
const Ticket = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Ticket) ||
    mongoose_1.default.model("Ticket", TicketSchema));
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.js.map