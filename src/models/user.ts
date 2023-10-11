import mongoose, { Document, Model, model, Schema } from "mongoose";
import { PermissionDoc, TPermission } from "./permission";
import { TRole } from "./role";

export interface TDepartment {
  name: string;
}

export interface DepartmentModel extends mongoose.Model<DepartmentDoc> {
  build(attrs: TDepartment): DepartmentDoc;
}

interface DepartmentDoc extends mongoose.Document {
  name: string;
}

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

departmentSchema.set("timestamps", true);

export const Department = mongoose.model<DepartmentDoc, DepartmentModel>(
  "department",
  departmentSchema
);

export interface TUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string | TDepartment;
  roles: Array<TRole>;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        id: string;
        organization?: string;
        firstName: string;
        contactNumber?: string;
        address?: string;
        lastName: string;
        roles: Array<TRole>;
        permissions?: Array<String>;
      };
      permissions: Array<PermissionDoc>;
    }
  }
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: TUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string | TDepartment;
  roles: Array<TRole>;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }]
});

userSchema.set("timestamps", true);

export const User: UserModel = (mongoose.models.User ||
  model<UserDoc>("User", userSchema)) as UserModel;
