"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const assignmentSchema = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    supervisor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Assignment = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Assignment) ||
    mongoose_1.default.model("Assignment", assignmentSchema));
exports.Assignment = Assignment;
//# sourceMappingURL=workflow.js.map