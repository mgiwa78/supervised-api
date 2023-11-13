"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StateSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    position: {
        type: String
    }
});
const State = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.State) ||
    mongoose_1.default.model("State", StateSchema));
exports.State = State;
//# sourceMappingURL=state.js.map