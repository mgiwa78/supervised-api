"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    supervisor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    keywords: [{ type: String }],
    completionDate: { type: Date },
    methodology: { type: String },
    resources: [{ type: String }],
    files: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "File" }],
    ethicalConsiderations: { type: String },
    milestones: [
        {
            name: { type: String, required: true },
            date: { type: Date, required: true }
        }
    ],
    status: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Workflow" }
});
projectSchema.set("timestamps", true);
const Project = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Project) ||
    mongoose_1.default.model("Project", projectSchema));
exports.Project = Project;
//# sourceMappingURL=project.js.map