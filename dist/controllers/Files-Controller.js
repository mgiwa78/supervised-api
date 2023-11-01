"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch__FILE__GET = exports.Fetch__DEPARTMENTS__GET = void 0;
const department_1 = require("../models/department");
const file_1 = require("../models/file");
const Fetch__DEPARTMENTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield department_1.Department.find();
        res.json({ status: "success", data: departments });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__DEPARTMENTS__GET = Fetch__DEPARTMENTS__GET;
const Fetch__FILE__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileID } = req.params;
        const file = yield file_1.File.findById(fileID);
        res.json({ status: "success", data: file });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__FILE__GET = Fetch__FILE__GET;
//# sourceMappingURL=Files-Controller.js.map