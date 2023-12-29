import { Request, Response } from "express";
import { Ticket, TTicketDoc } from "../models/ticket";

export const Create__TICKET__POST = async (req: Request, res: Response) => {
  try {
    const { category, subject, description } = req.body;
    console.log(category, subject, description);

    const ticket: TTicketDoc = await Ticket.create({
      category,
      description: description,
      subject: subject,
      author: req.user.id
    });

    console.log(ticket);
    return res.json({ status: "success", data: ticket });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__TICKET__PUT = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { category, subject, description } = req.body;

    const ticket: TTicketDoc = await Ticket.findByIdAndUpdate(ticketId, {
      category,
      description,
      subject
    });
    const tickets = await Ticket.find();
    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__MY__TICKETS__GET = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const tickets = await Ticket.find({ author: user.id })
      .populate("author")
      .populate("category");

    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__TICKETS__GET = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const tickets = await Ticket.find().populate("author").populate("category");

    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__TICKET__DELETE = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    await Ticket.findByIdAndDelete(ticketId);
    const tickets = await Ticket.find();

    return res.json({ status: "success", data: tickets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
