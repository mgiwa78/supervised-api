import { Request, Response } from "express";
import { FaqCategories, TFaqCategoriesDoc } from "../models/faq-categories";

export const Create__FAQCATEGORIES__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { title } = req.body;
    const faqcategories: TFaqCategoriesDoc = await FaqCategories.create({
      title: title
    });

    return res.json({ status: "success", data: faqcategories });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__FAQCATEGORIES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const faqcategories: Array<TFaqCategoriesDoc> = await FaqCategories.find();

    return res.json({ status: "success", data: faqcategories });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
