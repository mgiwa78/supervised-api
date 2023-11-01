import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";
import { TProject } from "./project";

export interface TDocument {
  title: string;
  content: string;
  status: string;
  description: string;
  supervisors: string[] | TUser[];
  project: string | TProject;
  author: string | TUser;
}

export interface DocumentDoc extends Doc {
  title: string;
  content: string;
  description: string;
  status: string;
  supervisors: string[] | TUser[];
  project: string | TProject;
  author: string | TUser;
}

export interface DocumentModel extends Model<DocumentDoc> {
  build(attrs: TDocument): DocumentDoc;
}

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: false, default: "Backlog" },
  description: { type: String, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
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

DocumentSchema.set("timestamps", true);

DocumentSchema.statics.build = (attrs: TDocument) => {
  return new Doc(attrs);
};

export const Document: DocumentModel = (mongoose.models?.Document ||
  mongoose.model<DocumentDoc, DocumentModel>(
    "Document",
    DocumentSchema
  )) as DocumentModel;

// export default mongoose.models?.Document ||
//   mongoose.model("Document", DocumentSchema);
