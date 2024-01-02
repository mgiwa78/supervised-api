import mongoose, { Document as Doc, Model } from "mongoose";

export interface TTicketResponse {
  ticket: string;
  message: string;
  author: string;
}

export interface TTicketResponseDoc extends Doc, TTicketResponse {}

interface TTicketResponseModel extends Model<TTicketResponseDoc> {
  build(attrs: TTicketResponse): TTicketResponseDoc;
}

const TicketResponseSchema = new mongoose.Schema({
  message: {
    type: String
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

TicketResponseSchema.set("timestamps", true);

const TicketResponse: TTicketResponseModel = (mongoose.models?.TicketResponse ||
  mongoose.model<TTicketResponseDoc, TTicketResponseModel>(
    "TicketResponse",
    TicketResponseSchema
  )) as TTicketResponseModel;

export { TicketResponse };
