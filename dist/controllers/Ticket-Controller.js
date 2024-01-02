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
exports.Delete__TICKET__DELETE = exports.Fetch__TICKETS__GET = exports.Fetch__MY__TICKETS__GET = exports.Update__TICKET__PUT = exports.Create__TICKET__POST = void 0;
const ticket_1 = require("../models/ticket");
const Create__TICKET__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, subject, description } = req.body;
        console.log(category, subject, description);
        const ticket = yield ticket_1.Ticket.create({
            category,
            description: description,
            subject: subject,
            author: req.user.id
        });
        console.log(ticket);
        return res.json({ status: "success", data: ticket });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__TICKET__POST = Create__TICKET__POST;
const Update__TICKET__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const { category, subject, description } = req.body;
        const ticket = yield ticket_1.Ticket.findByIdAndUpdate(ticketId, {
            category,
            description,
            subject
        });
        const tickets = yield ticket_1.Ticket.find();
        return res.json({ status: "success", data: tickets });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__TICKET__PUT = Update__TICKET__PUT;
const Fetch__MY__TICKETS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const hasResolveTicket = user.permissions.all.includes("ResolveTicket");
        if (hasResolveTicket) {
            const tickets = yield ticket_1.Ticket.find()
                .populate("author")
                .populate("category");
            return res.json({ status: "success", data: tickets });
        }
        else {
            const tickets = yield ticket_1.Ticket.find({ author: user.id })
                .populate("author")
                .populate("category");
            return res.json({ status: "success", data: tickets });
        }
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__MY__TICKETS__GET = Fetch__MY__TICKETS__GET;
const Fetch__TICKETS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield ticket_1.Ticket.find().populate("author").populate("category");
        return res.json({ status: "success", data: tickets });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__TICKETS__GET = Fetch__TICKETS__GET;
const Delete__TICKET__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        yield ticket_1.Ticket.findByIdAndDelete(ticketId);
        const tickets = yield ticket_1.Ticket.find();
        return res.json({ status: "success", data: tickets });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__TICKET__DELETE = Delete__TICKET__DELETE;
//# sourceMappingURL=Ticket-Controller.js.map