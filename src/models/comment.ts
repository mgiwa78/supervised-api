import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";
export interface TComment {
  content: string;
  author: string | TUser;
}

export interface CommentDoc extends Doc {
  content: string;
  author: string | TUser;
}

interface CommentModel extends Model<CommentDoc> {
  build(attrs: TComment): CommentDoc;
}

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

CommentSchema.set("timestamps", true);

// CommentSchema.statics.build = (attrs: TComment) => {
//   return new Doc(attrs);
// };

const Comment: CommentModel = (mongoose.models?.Comment ||
  mongoose.model<CommentDoc, CommentModel>(
    "Comment",
    CommentSchema
  )) as CommentModel;

export { Comment };
// export default mongoose.models?.Document ||
//   mongoose.model("Document", CommentSchema);
