import { Request, Response } from "express";
import {
  TicketCategories,
  TTicketCategoriesDoc
} from "../models/ticket-categories";

export const Create__TICKET_CATEGORIES__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { title } = req.body;
    const ticketCategories: TTicketCategoriesDoc =
      await TicketCategories.create({
        title: title
      });

    return res.json({ status: "success", data: ticketCategories });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__TICKET_CATEGORIES__PUT = async (
  req: Request,
  res: Response
) => {
  try {
    const { ticketCategoryId } = req.params;
    const { title } = req.body;

    await TicketCategories.findByIdAndUpdate(ticketCategoryId, {
      title: title
    });
    const faqcategories: Array<TTicketCategoriesDoc> =
      await TicketCategories.find();

    return res.json({ status: "success", data: faqcategories });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__TICKET_CATEGORIES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const faqcategories: Array<TTicketCategoriesDoc> =
      await TicketCategories.find();

    return res.json({ status: "success", data: faqcategories });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__TICKET_CATEGORIES__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { faqCategoryId } = req.params;
    await TicketCategories.findByIdAndDelete(faqCategoryId);
    const faqCategories = await TicketCategories.find();

    return res.json({ status: "success", data: faqCategories });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
