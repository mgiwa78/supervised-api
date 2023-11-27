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
exports.Fetch__FAQCATEGORIES__GET = exports.Create__FAQCATEGORIES__POST = void 0;
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
//# sourceMappingURL=Faq-Categories-Controller.js.map