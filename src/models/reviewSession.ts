import mongoose, { Document, Model, Schema } from "mongoose";
import { TUser } from "./user";
import { TDocument } from "./document";
import { TComment } from "./comment";

export interface TReviewSession {
  _id: string;
  content: string;
  comments: string | TComment;
  supervisors: Array<TUser>;
  document: string | TDocument;
}

export interface ReviewSessionModel extends Model<ReviewSessionDoc> {
  build(attrs: TReviewSession): ReviewSessionDoc;
}

export interface ReviewSessionDoc extends Document {
  _id: string;
  content: string;
  comments: string | TComment;
  supervisors: Array<TUser> | Array<string>;
  document: string | TDocument;
}

const ReviewSessionSchema = new Schema({
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  content: { type: Schema.Types.String },
  supervisors: [{ type: Schema.Types.ObjectId, ref: "Supervisors" }],
  document: { type: Schema.Types.ObjectId, ref: "Document" }
});

ReviewSessionSchema.set("timestamps", true);

ReviewSessionSchema.statics.build = (attrs: TReviewSession) => {
  return new ReviewSession(attrs);
};

export const ReviewSession: ReviewSessionModel = (mongoose.models
  ?.ReviewSession ||
  mongoose.model<ReviewSessionDoc, ReviewSessionModel>(
    "ReviewSession",
    ReviewSessionSchema
  )) as ReviewSessionModel;

// export default mongoose.models?.ReviewSession ||
//   mongoose.model("ReviewSession", ReviewSessionSchema);
