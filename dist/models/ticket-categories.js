"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TicketCategoriesSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    }
});
TicketCategoriesSchema.set("timestamps", true);
const TicketCategories = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.TicketCategories) ||
    mongoose_1.default.model("TicketCategories", TicketCategoriesSchema));
exports.TicketCategories = TicketCategories;
//# sourceMappingURL=ticket-categories.js.map