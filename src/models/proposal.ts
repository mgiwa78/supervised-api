import { TUser } from "./user";
import mongoose, { Document as Doc, Model } from "mongoose";

export interface TProjectProposal {
  title: string;
  description: string;
  objectives: string[];
  files: Array<{
    path: string;
    name: string;
  }>;
  expStart: string;
  expEnd: string;
  team: string[] | TUser[];
  status: string;
  student: string | TUser;
}

export interface ProjectProposalDoc extends Doc {
  title: string;
  description: string;
  expStart: string;
  expEnd: string;
  objectives: string[];
  files: Array<{
    path: string;
    name: string;
  }>;
  status: string;
  student: string | TUser;
}

export interface ProjectProposalModel extends Model<ProjectProposalDoc> {
  build(attrs: TProjectProposal): ProjectProposalDoc;
}

const ProjectProposalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  methodology: { type: String, required: true },
  timeline: { type: String, required: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  objectives: { type: [String], required: true },
  status: { type: String, required: false, default: "Pending" },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

ProjectProposalSchema.set("timestamps", true);

ProjectProposalSchema.statics.build = (attrs: TProjectProposal) => {
  return new Doc(attrs);
};

export const ProjectProposal: ProjectProposalModel = (mongoose.models
  ?.ProjectProposal ||
  mongoose.model<ProjectProposalDoc, ProjectProposalModel>(
    "ProjectProposal",
    ProjectProposalSchema
  )) as ProjectProposalModel;
