import mongoose, { Document as Doc, Model } from "mongoose";

export interface TFaqCategories {
  title: string;
}

export interface TFaqCategoriesDoc extends Doc, TFaqCategories {}

interface TFaqCategoriesModel extends Model<TFaqCategoriesDoc> {
  build(attrs: TFaqCategories): TFaqCategoriesDoc;
}

const FaqCategoriesSchema = new mongoose.Schema({
  title: {
    type: String
  }
});

const FaqCategories: TFaqCategoriesModel = (mongoose.models?.FaqCategories ||
  mongoose.model<TFaqCategoriesDoc, TFaqCategoriesModel>(
    "FaqCategories",
    FaqCategoriesSchema
  )) as TFaqCategoriesModel;

export { FaqCategories };
