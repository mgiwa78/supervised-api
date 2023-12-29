"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Department = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const departmentSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true }
});
departmentSchema.set("timestamps", true);
exports.Department = mongoose_1.default.model("department", departmentSchema);
const userSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    department: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Department"
    },
    roles: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Role", required: true }]
});
userSchema.set("timestamps", true);
exports.User = (mongoose_1.default.models.User ||
    (0, mongoose_1.model)("User", userSchema));
//# sourceMappingURL=user.js.map