import mongoose, { Document, Model, model, Schema } from "mongoose";
import { TPermission } from "./permission";

export interface TRole {
  name: string;
  permissions: Array<TPermission>;
}

interface RoleModel extends mongoose.Model<RoleDoc> {
  build(attrs: TRole): RoleDoc;
}

export interface RoleDoc extends mongoose.Document {
  name: string;
  permissions: Array<TPermission>;
}

const roleSchema = new Schema<RoleDoc, RoleModel>({
  name: { type: String, required: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }]
});

roleSchema.set("timestamps", true);

const Role: RoleModel = (mongoose.models?.Role ||
  mongoose.model<RoleDoc, RoleModel>("Role", roleSchema)) as RoleModel;
// export default mongoose.models?.Role || mongoose.model("Role", roleSchema);

export { Role };
