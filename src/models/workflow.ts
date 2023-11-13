import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";
import { TProject } from "./project";
import { TState } from "./state";

export interface TWorkflow {
  title: string;
  color: string;
  defaultOrder: string;
  description: string;
  states: Array<TState>;
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
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  defaultOrder: {
    type: String
  },
  states: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State"
    }
  ]
});

const Workflow: WorkflowModel = (mongoose.models?.Workflow ||
  mongoose.model<WorkflowDoc, WorkflowModel>(
    "Workflow",
    WorkflowSchema
  )) as WorkflowModel;

export { Workflow };
