import { Request, Response } from "express";
import { Faq, TFaqDoc } from "../models/faq";

export const Create__FAQ__POST = async (req: Request, res: Response) => {
  try {
    const { category, question, answer } = req.body;
    const faq: TFaqDoc = await Faq.create({
      category,
      answer,
      question
    });

    return res.json({ status: "success", data: faq });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Update__FAQ__PUT = async (req: Request, res: Response) => {
  try {
    const { faqId } = req.params;
    const { category, question, answer } = req.body;

    const faq: TFaqDoc = await Faq.findByIdAndUpdate(faqId, {
      category,
      answer,
      question
    });
    const faqs = await Faq.find();
    return res.json({ status: "success", data: faqs });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__FAQS__GET = async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.find();

    return res.json({ status: "success", data: faqs });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Delete__FAQ__DELETE = async (req: Request, res: Response) => {
  try {
    const { faqId } = req.params;
    await Faq.findByIdAndDelete(faqId);
    const faqs = await Faq.find();

    return res.json({ status: "success", data: faqs });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
