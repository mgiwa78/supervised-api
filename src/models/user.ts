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
  avatar: string;
  firstName: string;
  contactNumber: string;
  lastName: string;
  studentId?: string;
  email: string;
  supervisor: string;
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
        department?: string;
        studentId?: string;
        firstName: string;
        contactNumber?: string;
        address?: string;
        lastName: string;
        roles: Array<TRole>;
        permissions?: {
          all: Array<String>;
          types: {
            getAllUsers: Array<String>;
          };
        };
      };
      permissions: Array<PermissionDoc>;
    }
  }
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: TUser): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  firstName: string;
  avatar: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  studentId?: string;
  department: string;
  notification: { email: boolean };
  supervisor: string | TUser;
  roles: Array<TRole>;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  avatar: { type: String },
  notification: {
    type: { email: Boolean },
    required: true,
    default: { email: false }
  },
  lastName: { type: String, required: true },
  studentId: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }]
});

userSchema.set("timestamps", true);

export const User: UserModel = (mongoose.models.User ||
  model<UserDoc>("User", userSchema)) as UserModel;
