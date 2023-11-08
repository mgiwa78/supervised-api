import mongoose, { Document, Model, model, Schema } from "mongoose";
import { TRole } from "./role";

export interface TFile {
  name: string;
  path: string;
  status: string;
}

interface FileModel extends mongoose.Model<FileDoc> {
  build(attrs: TFile): FileDoc;
}

export interface FileDoc extends mongoose.Document {
  name: string;
  status: string;
  path: string;
  types: Array<TRole>;
}

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  status: { type: String, required: true }
});

FileSchema.set("timestamps", true);
// mongoose.model("File", FileSchema);

const File: FileModel = (mongoose.models?.File ||
  mongoose.model<FileDoc, FileModel>("File", FileSchema)) as FileModel;

export { File };

// export default mongoose.models?.File ||
//   mongoose.model("File", departmentSchema);
