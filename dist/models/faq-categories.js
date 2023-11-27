"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FaqCategoriesSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    }
});
const FaqCategories = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.FaqCategories) ||
    mongoose_1.default.model("FaqCategories", FaqCategoriesSchema));
exports.FaqCategories = FaqCategories;
//# sourceMappingURL=faq-categories.js.map