import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";
import { TProject } from "./project";

export interface TAssignment {
  student: string | TUser;
  supervisor: string | TUser;
  project: string | TProject;
  assignmentDate: Date;
  dueDate: Date;
  status: "Pending" | "Completed";
}

export interface AssignmentDoc extends Doc, TAssignment {}

interface AssignmentModel extends Model<AssignmentDoc> {
  build(attrs: TAssignment): AssignmentDoc;
}

const assignmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  assignmentDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  }
});

const Assignment: AssignmentModel = (mongoose.models?.Assignment ||
  mongoose.model<AssignmentDoc, AssignmentModel>(
    "Assignment",
    assignmentSchema
  )) as AssignmentModel;

export { Assignment };
