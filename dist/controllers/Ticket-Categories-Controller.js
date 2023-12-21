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
exports.Delete__TICKET_CATEGORIES__DELETE = exports.Fetch__TICKET_CATEGORIES__GET = exports.Update__TICKET_CATEGORIES__PUT = exports.Create__TICKET_CATEGORIES__POST = void 0;
const ticket_categories_1 = require("../models/ticket-categories");
const Create__TICKET_CATEGORIES__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const ticketCategories = yield ticket_categories_1.TicketCategories.create({
            title: title
        });
        return res.json({ status: "success", data: ticketCategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__TICKET_CATEGORIES__POST = Create__TICKET_CATEGORIES__POST;
const Update__TICKET_CATEGORIES__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketCategoryId } = req.params;
        const { title } = req.body;
        yield ticket_categories_1.TicketCategories.findByIdAndUpdate(ticketCategoryId, {
            title: title
        });
        const faqcategories = yield ticket_categories_1.TicketCategories.find();
        return res.json({ status: "success", data: faqcategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__TICKET_CATEGORIES__PUT = Update__TICKET_CATEGORIES__PUT;
const Fetch__TICKET_CATEGORIES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqcategories = yield ticket_categories_1.TicketCategories.find();
        return res.json({ status: "success", data: faqcategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__TICKET_CATEGORIES__GET = Fetch__TICKET_CATEGORIES__GET;
const Delete__TICKET_CATEGORIES__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { faqCategoryId } = req.params;
        yield ticket_categories_1.TicketCategories.findByIdAndDelete(faqCategoryId);
        const faqCategories = yield ticket_categories_1.TicketCategories.find();
        return res.json({ status: "success", data: faqCategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__TICKET_CATEGORIES__DELETE = Delete__TICKET_CATEGORIES__DELETE;
//# sourceMappingURL=Ticket-Categories-Controller.js.map