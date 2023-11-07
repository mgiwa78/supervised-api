import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";
import { TProject } from "./project";

export interface TWorkflow {
  title: string;
  color: string;
  order: string;
  default: string;
}

export interface WorkflowDoc extends Doc, TWorkflow {}

interface WorkflowModel extends Model<WorkflowDoc> {
  build(attrs: TWorkflow): WorkflowDoc;
}

const WorkflowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  order: {
    type: String
  },
  default: {
    type: String
  }
});

const Workflow: WorkflowModel = (mongoose.models?.Workflow ||
  mongoose.model<WorkflowDoc, WorkflowModel>(
    "Workflow",
    WorkflowSchema
  )) as WorkflowModel;

export { Workflow };
