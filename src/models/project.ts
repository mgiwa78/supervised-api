import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";

export interface TProject {
  title: string;
  description: string;
  student: string | TUser;
  supervisor: string | TUser;
  keywords: string[];
  files: Array<{
    path: string;
    name: string;
  }>;
  completionDate: Date;
  category: string;
  methodology: string;
  resources: string[];
  ethicalConsiderations: string;
  milestones: { name: string; date: Date }[];
  status: "Draft" | "In Progress" | "Pending Approval";
  comments: string;
}

export interface ProjectDoc extends Doc, TProject {}

interface ProjectModel extends Model<ProjectDoc> {
  build(attrs: TProject): ProjectDoc;
}

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  keywords: [{ type: String }],
  completionDate: { type: Date },
  methodology: { type: String },
  resources: [{ type: String }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  ethicalConsiderations: { type: String },
  milestones: [
    {
      name: { type: String, required: true },
      date: { type: Date, required: true }
    }
  ],
  status: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow" }
});
projectSchema.set("timestamps", true);

const Project: ProjectModel = (mongoose.models?.Project ||
  mongoose.model<ProjectDoc, ProjectModel>(
    "Project",
    projectSchema
  )) as ProjectModel;

export { Project };
