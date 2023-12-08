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
exports.Delete__FAQCATEGORIES__DELETE = exports.Fetch__FAQCATEGORIES__GET = exports.Update__FAQCATEGORIES__PUT = exports.Create__FAQCATEGORIES__POST = void 0;
const faq_categories_1 = require("../models/faq-categories");
const Create__FAQCATEGORIES__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const faqcategories = yield faq_categories_1.FaqCategories.create({
            title: title
        });
        return res.json({ status: "success", data: faqcategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__FAQCATEGORIES__POST = Create__FAQCATEGORIES__POST;
const Update__FAQCATEGORIES__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { faqCategoryId } = req.params;
        const { title } = req.body;
        yield faq_categories_1.FaqCategories.findByIdAndUpdate(faqCategoryId, {
            title: title
        });
        const faqcategories = yield faq_categories_1.FaqCategories.find();
        return res.json({ status: "success", data: faqcategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__FAQCATEGORIES__PUT = Update__FAQCATEGORIES__PUT;
const Fetch__FAQCATEGORIES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqcategories = yield faq_categories_1.FaqCategories.find();
        return res.json({ status: "success", data: faqcategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__FAQCATEGORIES__GET = Fetch__FAQCATEGORIES__GET;
const Delete__FAQCATEGORIES__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { faqCategoryId } = req.params;
        yield faq_categories_1.FaqCategories.findByIdAndDelete(faqCategoryId);
        const faqCategories = yield faq_categories_1.FaqCategories.find();
        return res.json({ status: "success", data: faqCategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__FAQCATEGORIES__DELETE = Delete__FAQCATEGORIES__DELETE;
//# sourceMappingURL=Faq-Categories-Controller.js.map