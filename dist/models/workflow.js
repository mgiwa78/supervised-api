"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const WorkflowSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    defaultOrder: {
        type: String
    },
    states: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "State"
        }
    ]
});
const Workflow = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Workflow) ||
    mongoose_1.default.model("Workflow", WorkflowSchema));
exports.Workflow = Workflow;
//# sourceMappingURL=workflow.js.map