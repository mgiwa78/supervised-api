import mongoose, { Document as Doc, Model } from "mongoose";

export interface TTicket {
  category: string;
  subject: string;
  status: string;
  description: string;
  author: string;
}

export interface TTicketDoc extends Doc, TTicket {}

interface TTicketModel extends Model<TTicketDoc> {
  build(attrs: TTicket): TTicketDoc;
}

const TicketSchema = new mongoose.Schema({
  subject: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "Pending"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TicketCategories"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

TicketSchema.set("timestamps", true);

const Ticket: TTicketModel = (mongoose.models?.Ticket ||
  mongoose.model<TTicketDoc, TTicketModel>(
    "Ticket",
    TicketSchema
  )) as TTicketModel;

export { Ticket };
