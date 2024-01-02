"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketResponse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TicketResponseSchema = new mongoose_1.default.Schema({
    message: {
        type: String
    },
    ticket: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
});
TicketResponseSchema.set("timestamps", true);
const TicketResponse = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.TicketResponse) ||
    mongoose_1.default.model("TicketResponse", TicketResponseSchema));
exports.TicketResponse = TicketResponse;
//# sourceMappingURL=ticket-response.js.map