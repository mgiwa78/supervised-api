import mongoose, { Document as Doc, Model } from "mongoose";

export interface TFaq {
  category: string;
  question: string;
  answer: string;
}

export interface TFaqDoc extends Doc, TFaq {}

interface TFaqModel extends Model<TFaqDoc> {
  build(attrs: TFaq): TFaqDoc;
}

const FaqSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FaqCategories"
  },
  question: {
    type: String
  },
  answer: {
    type: String
  }
});

const Faq: TFaqModel = (mongoose.models?.Faq ||
  mongoose.model<TFaqDoc, TFaqModel>("Faq", FaqSchema)) as TFaqModel;

export { Faq };
