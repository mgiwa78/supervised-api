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
exports.Fetch__FAQS__GET = exports.Create__FAQ__POST = void 0;
const faq_1 = require("../models/faq");
const Create__FAQ__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { caterogy, question, answer } = req.body;
        const faq = yield faq_1.Faq.create({
            caterogy,
            answer,
            question
        });
        return res.json({ status: "success", data: faq });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__FAQ__POST = Create__FAQ__POST;
const Fetch__FAQS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqs = yield faq_1.Faq.find().populate("category");
        return res.json({ status: "success", data: faqs });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__FAQS__GET = Fetch__FAQS__GET;
//# sourceMappingURL=Faq-Controller.js.map