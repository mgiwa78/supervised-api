"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FileSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    status: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "State" }
});
FileSchema.set("timestamps", true);
// mongoose.model("File", FileSchema);
const File = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.File) ||
    mongoose_1.default.model("File", FileSchema));
exports.File = File;
// export default mongoose.models?.File ||
//   mongoose.model("File", departmentSchema);
//# sourceMappingURL=file.js.map