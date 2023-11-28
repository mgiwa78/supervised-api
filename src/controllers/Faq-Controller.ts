import { Request, Response } from "express";
import { Faq, TFaqDoc } from "../models/faq";

export const Create__FAQ__POST = async (req: Request, res: Response) => {
  try {
    const { caterogy, question, answer } = req.body;
    const faq: TFaqDoc = await Faq.create({
      caterogy,
      answer,
      question
    });

    return res.json({ status: "success", data: faq });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__FAQS__GET = async (req: Request, res: Response) => {
  try {
    const faqs: Array<TFaqDoc> = await Faq.find().populate("category");

    return res.json({ status: "success", data: faqs });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
