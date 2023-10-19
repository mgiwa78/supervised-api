import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";

export interface TComment {
  title: string;
  content: string;
  description: string;
  supervisors: string[] | TUser[];
  author: string | TUser;
}

export interface CommentDoc extends Doc {
  title: string;
  content: string;
  description: string;
  supervisors: string[] | TUser[];
  author: string | TUser;
}

export interface CommentModel extends Model<CommentDoc> {
  build(attrs: TComment): CommentDoc;
}

const CommentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  supervisors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supervisors"
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

CommentSchema.set("timestamps", true);

CommentSchema.statics.build = (attrs: TComment) => {
  return new Doc(attrs);
};

export const Comment: CommentModel = (mongoose.models?.Document ||
  mongoose.model<CommentDoc, CommentModel>(
    "Comment",
    CommentSchema
  )) as CommentModel;

// export default mongoose.models?.Document ||
//   mongoose.model("Document", CommentSchema);
