import mongoose, { Document as Doc, Model } from "mongoose";

export interface TTicketCategories {
  title: string;
}

export interface TTicketCategoriesDoc extends Doc, TTicketCategories {}

interface TTicketCategoriesModel extends Model<TTicketCategoriesDoc> {
  build(attrs: TTicketCategories): TTicketCategoriesDoc;
}

const TicketCategoriesSchema = new mongoose.Schema({
  title: {
    type: String
  }
});
TicketCategoriesSchema.set("timestamps", true);

const TicketCategories: TTicketCategoriesModel = (mongoose.models
  ?.TicketCategories ||
  mongoose.model<TTicketCategoriesDoc, TTicketCategoriesModel>(
    "TicketCategories",
    TicketCategoriesSchema
  )) as TTicketCategoriesModel;

export { TicketCategories };
