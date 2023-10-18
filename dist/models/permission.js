"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const permissionSchema = new mongoose_1.default.Schema({
    route: { type: String, required: true },
    action: { type: String, required: true },
    types: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Types", required: true }
    ]
});
permissionSchema.set("timestamps", true);
// mongoose.model("Permission", permissionSchema);
const Permission = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Permission) ||
    mongoose_1.default.model("Permission", permissionSchema));
exports.Permission = Permission;
// export default mongoose.models?.Permission ||
//   mongoose.model("Permission", departmentSchema);
//# sourceMappingURL=permission.js.map