import { Request, Response } from "express";
import { TicketResponse, TTicketResponseDoc } from "../models/ticket-response";
import { Ticket } from "../models/ticket";
import { ObjectId } from "mongodb";

export const Create__TICKET_RESPONSE__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { ticketId, message } = req.body;
    console.log(ticketId, message);
    const { user } = req;

    const hasResolveTicket = user.permissions.all.includes("ResolveTicket");
    const ticket = await Ticket.findById(ticketId);
    console.log(user.isAdmin);
    console.log(ticket.author.toString(), user.id);

    if (
      user.isAdmin ||
      hasResolveTicket ||
      ticket.author.toString() === user.id
    ) {
      const ticketResponse: TTicketResponseDoc = await TicketResponse.create({
        ticket: ticketId,
        message,
        author: req.user.id
      });

      console.log(ticketResponse);
      return res.json({ status: "success", data: ticketResponse });
    }
    return res.status(403).json({ message: "Permission denied" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__TICKET_RESPONSE__PUT = async (
  req: Request,
  res: Response
) => {
  try {
    const { ticketId } = req.params;
    const { category, subject, description } = req.body;

    const ticket: TTicketResponseDoc = await TicketResponse.findByIdAndUpdate(
      ticketId,
      {
        category,
        description,
        subject
      }
    );
    const tickets = await TicketResponse.find();
    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__MY__TICKET_RESPONSES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { user } = req;

    const tickets = await TicketResponse.find({ author: user.id })
      .populate("author")
      .populate("category");

    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__TICKET_RESPONSES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { ticketId } = req.params;

    const tickets = await TicketResponse.find({ ticket: ticketId }).populate(
      "author"
    );

    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__TICKET_RESPONSE__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { ticketId } = req.params;
    await TicketResponse.findByIdAndDelete(ticketId);
    const tickets = await TicketResponse.find();

    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
