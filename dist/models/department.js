"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const departmentSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true }
});
departmentSchema.set("timestamps", true);
departmentSchema.statics.build = (attrs) => {
    return new exports.Department(attrs);
};
exports.Department = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Department) ||
    mongoose_1.default.model("Department", departmentSchema));
// export default mongoose.models?.Department ||
//   mongoose.model("Department", departmentSchema);
//# sourceMappingURL=department.js.map