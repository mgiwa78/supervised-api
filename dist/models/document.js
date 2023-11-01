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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DocumentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: false, default: "Backlog" },
    description: { type: String, required: true },
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Project"
    },
    supervisors: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Supervisors"
        }
    ],
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
});
DocumentSchema.set("timestamps", true);
DocumentSchema.statics.build = (attrs) => {
    return new mongoose_1.Document(attrs);
};
exports.Document = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Document) ||
    mongoose_1.default.model("Document", DocumentSchema));
// export default mongoose.models?.Document ||
//   mongoose.model("Document", DocumentSchema);
//# sourceMappingURL=document.js.map