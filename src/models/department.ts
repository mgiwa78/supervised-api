import mongoose, { Document, Model } from "mongoose";

export interface TDepartment {
  name: string;
}

export interface DepartmentDoc extends Document {
  name: string;
}

export interface DepartmentModel extends Model<DepartmentDoc> {
  build(attrs: TDepartment): DepartmentDoc;
}

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

departmentSchema.set("timestamps", true);

departmentSchema.statics.build = (attrs: TDepartment) => {
  return new Department(attrs);
};

export const Department: DepartmentModel = (mongoose.models?.Department ||
  mongoose.model<DepartmentDoc, DepartmentModel>(
    "Department",
    departmentSchema
  )) as DepartmentModel;

// export default mongoose.models?.Department ||
//   mongoose.model("Department", departmentSchema);
