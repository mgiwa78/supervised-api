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
exports.Delete__FILE__DELETE = exports.Update__PROJECTS__PUT = exports.Create__PROJECTS__POST = exports.Fetch__PROJECT_ASSIGNED__GET = exports.Fetch__PROJECT__GET = exports.Fetch__ALL_PROJECTS__GET = exports.Fetch__STUDENT__PROJECTS__GET = exports.Fetch__USER__PROJECTS__GET = void 0;
const project_1 = require("../models/project");
const Fetch__USER__PROJECTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const documents = yield project_1.Project.find({
            student: userId
        }).populate("status");
        res.json({ status: "success", data: documents });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__USER__PROJECTS__GET = Fetch__USER__PROJECTS__GET;
const Fetch__STUDENT__PROJECTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("first");
        const { studentId } = req.params;
        const documents = yield project_1.Project.find({
            student: studentId
        })
            .populate("files")
            .populate("workflow");
        res.json({ status: "success", data: documents });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__STUDENT__PROJECTS__GET = Fetch__STUDENT__PROJECTS__GET;
const Fetch__ALL_PROJECTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documents = yield project_1.Project.find()
            .populate("files")
            .populate("workflow");
        res.json({ status: "success", data: documents });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__ALL_PROJECTS__GET = Fetch__ALL_PROJECTS__GET;
const Fetch__PROJECT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const project = yield project_1.Project.findById(projectId)
            .populate("student")
            .populate("files")
            .populate("workflow")
            .populate({
            path: "workflow",
            populate: {
                path: "states"
            }
        });
        res.json({ status: "success", data: project });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__PROJECT__GET = Fetch__PROJECT__GET;
const Fetch__PROJECT_ASSIGNED__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const projects = yield project_1.Project.find()
            .populate("student")
            .populate("files")
            .populate("workflow");
        const assigned = projects === null || projects === void 0 ? void 0 : projects.map((project) => {
            var _a, _b, _c;
            return (((_a = project.student) === null || _a === void 0 ? void 0 : _a.supervisor) &&
                ((_c = (_b = project.student) === null || _b === void 0 ? void 0 : _b.supervisor) === null || _c === void 0 ? void 0 : _c.toString()) === user.id &&
                project);
        });
        res.json({ status: "success", data: assigned });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__PROJECT_ASSIGNED__GET = Fetch__PROJECT_ASSIGNED__GET;
const Create__PROJECTS__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, methodology, student, description } = req.body;
    try {
        const project = new project_1.Project({
            title,
            methodology,
            description,
            student: student ? student : req.user.id,
            status: "Pending Review"
        });
        yield project.save();
        res.json({ status: "success", data: project });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.Create__PROJECTS__POST = Create__PROJECTS__POST;
const Update__PROJECTS__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, methodology, type, description } = req.body;
    const { projectID } = req.params;
    try {
        if (projectID) {
            const project = yield project_1.Project.findOne({
                _id: req.params.projectID,
                author: req.user.id
            }).populate("files");
            if (!project) {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid Project ID" });
            }
            project.title = title;
            project.methodology = methodology;
            project.description = description;
            yield project.save();
            return res.json({ status: "success", data: project });
        }
        return res
            .status(400)
            .json({ status: "error", message: "Invalid DocumentIddD" });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__PROJECTS__PUT = Update__PROJECTS__PUT;
const Delete__FILE__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, methodology, type, description } = req.body;
    const { projectID } = req.params;
    try {
        if (projectID) {
            const project = yield project_1.Project.findOne({
                _id: req.params.projectID,
                author: req.user.id
            }).populate("files");
            if (!project) {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid Project ID" });
            }
            project.title = title;
            project.methodology = methodology;
            project.description = description;
            yield project.save();
            return res.json({ status: "success", data: project });
        }
        return res
            .status(400)
            .json({ status: "error", message: "Invalid DocumentID" });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__FILE__DELETE = Delete__FILE__DELETE;
//# sourceMappingURL=Project-Controller.js.map