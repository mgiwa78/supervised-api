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
exports.Delete__TICKET_RESPONSE__DELETE = exports.Fetch__TICKET_RESPONSES__GET = exports.Fetch__MY__TICKET_RESPONSES__GET = exports.Update__TICKET_RESPONSE__PUT = exports.Create__TICKET_RESPONSE__POST = void 0;
const ticket_response_1 = require("../models/ticket-response");
const ticket_1 = require("../models/ticket");
const Create__TICKET_RESPONSE__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId, message } = req.body;
        console.log(ticketId, message);
        const { user } = req;
        const hasResolveTicket = user.permissions.all.includes("ResolveTicket");
        const ticket = yield ticket_1.Ticket.findById(ticketId);
        console.log(user.isAdmin);
        console.log(ticket.author.toString(), user.id);
        if (user.isAdmin ||
            hasResolveTicket ||
            ticket.author.toString() === user.id) {
            const ticketResponse = yield ticket_response_1.TicketResponse.create({
                ticket: ticketId,
                message,
                author: req.user.id
            });
            console.log(ticketResponse);
            return res.json({ status: "success", data: ticketResponse });
        }
        return res.status(403).json({ message: "Permission denied" });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__TICKET_RESPONSE__POST = Create__TICKET_RESPONSE__POST;
const Update__TICKET_RESPONSE__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const { category, subject, description } = req.body;
        const ticket = yield ticket_response_1.TicketResponse.findByIdAndUpdate(ticketId, {
            category,
            description,
            subject
        });
        const tickets = yield ticket_response_1.TicketResponse.find();
        return res.json({ status: "success", data: tickets });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__TICKET_RESPONSE__PUT = Update__TICKET_RESPONSE__PUT;
const Fetch__MY__TICKET_RESPONSES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const tickets = yield ticket_response_1.TicketResponse.find({ author: user.id })
            .populate("author")
            .populate("category");
        return res.json({ status: "success", data: tickets });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__MY__TICKET_RESPONSES__GET = Fetch__MY__TICKET_RESPONSES__GET;
const Fetch__TICKET_RESPONSES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const tickets = yield ticket_response_1.TicketResponse.find({ ticket: ticketId }).populate("author");
        return res.json({ status: "success", data: tickets });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__TICKET_RESPONSES__GET = Fetch__TICKET_RESPONSES__GET;
const Delete__TICKET_RESPONSE__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        yield ticket_response_1.TicketResponse.findByIdAndDelete(ticketId);
        const tickets = yield ticket_response_1.TicketResponse.find();
        return res.json({ status: "success", data: tickets });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__TICKET_RESPONSE__DELETE = Delete__TICKET_RESPONSE__DELETE;
//# sourceMappingURL=Ticket-Response-Controller.js.map