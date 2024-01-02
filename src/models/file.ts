import mongoose, { Document, Model, model, Schema } from "mongoose";
import { TRole } from "./role";

export interface TFile {
  title: string;
  description: string;
  path: string;
  status: string | null;
}

interface FileModel extends mongoose.Model<FileDoc> {
  build(attrs: TFile): FileDoc;
}

export interface FileDoc extends mongoose.Document {
  title: string;
  description: string;
  status: string | null;
  path: string;
  types: Array<TRole>;
}

const FileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "State" }
});

FileSchema.set("timestamps", true);

// mongoose.model("File", FileSchema);

const File: FileModel = (mongoose.models?.File ||
  mongoose.model<FileDoc, FileModel>("File", FileSchema)) as FileModel;

export { File };

// export default mongoose.models?.File ||
//   mongoose.model("File", departmentSchema);
