import mongoose, { Document, Model, model, Schema } from "mongoose";
import { TRole } from "./role";

export interface TPermission {
  route: string;
  action: string;
}

interface PermissionModel extends mongoose.Model<PermissionDoc> {
  build(attrs: TPermission): PermissionDoc;
}

export interface PermissionDoc extends mongoose.Document {
  route: string;
  action: string;
  types: Array<TRole>;
}

const permissionSchema = new mongoose.Schema({
  route: { type: String, required: true },
  action: { type: String, required: true },
  types: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Types", required: true }
  ]
});

permissionSchema.set("timestamps", true);
// mongoose.model("Permission", permissionSchema);

const Permission: PermissionModel = (mongoose.models?.Permission ||
  mongoose.model<PermissionDoc, PermissionModel>(
    "Permission",
    permissionSchema
  )) as PermissionModel;

export { Permission };

// export default mongoose.models?.Permission ||
//   mongoose.model("Permission", departmentSchema);
