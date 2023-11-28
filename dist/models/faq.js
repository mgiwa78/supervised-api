"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faq = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FaqSchema = new mongoose_1.default.Schema({
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "FaqCategories"
    },
    question: {
        type: String
    },
    answer: {
        type: String
    }
});
const Faq = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Faq) ||
    mongoose_1.default.model("Faq", FaqSchema));
exports.Faq = Faq;
//# sourceMappingURL=faq.js.map