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
exports.Delete__FILE__DELETE = exports.Update__PROJECT__PUT = exports.Fetch__USER_DASHBOARD_DATA__GET = exports.Upload__PROJECT_DOCUMENT__PUT = exports.Create__PROJECTS__POST = exports.Fetch__PROJECT_ASSIGNED__GET = exports.Fetch__PROJECT__GET = exports.Fetch__ALL_PROJECTS__GET = exports.Fetch__STUDENT__PROJECTS__GET = exports.Fetch__USER__PROJECTS__GET = void 0;
const project_1 = require("../models/project");
const models_1 = require("../models");
const file_1 = require("../models/file");
const workflow_1 = require("../models/workflow");
const Notification_Controller_1 = require("./Notification-Controller");
const Fetch__USER__PROJECTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        (0, Notification_Controller_1.Send__NOTIFICATION)(userId);
        const documents = yield project_1.Project.find({
            student: userId
        })
            .populate("status")
            .populate("student");
        res.json({ status: "success", data: documents });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__USER__PROJECTS__GET = Fetch__USER__PROJECTS__GET;
const Fetch__STUDENT__PROJECTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const documents = yield project_1.Project.find({
            student: studentId
        })
            .populate("files")
            .populate("student")
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
            .populate("student")
            .populate({
            path: "student",
            populate: {
                path: "supervisor"
            }
        })
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
            .populate("status")
            .populate("workflow")
            .populate({
            path: "workflow",
            populate: {
                path: "states"
            }
        })
            .populate({
            path: "files",
            populate: {
                path: "status"
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
        const assignedStudents = yield models_1.User.find({ supervisor: user.id });
        const assignedStudentIds = assignedStudents.map((student) => student._id);
        const projects = yield project_1.Project.find({
            $or: [{ student: { $in: assignedStudentIds } }, { supervisor: user.id }]
        })
            .populate("student")
            .populate("status")
            .populate("files")
            .populate("workflow")
            .populate({ path: "student", populate: { path: "department" } });
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
    const { title, methodology, student, description, supervisor } = req.body;
    try {
        const project = new project_1.Project(Object.assign({ title,
            methodology,
            description, student: student ? student : req.user.id, status: "Pending Review" }, (supervisor && { supervisor: supervisor })));
        yield project.save();
        res.json({ status: "success", data: project });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.Create__PROJECTS__POST = Create__PROJECTS__POST;
const Upload__PROJECT_DOCUMENT__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req.body;
    const { projectId } = req.params;
    let addStatus;
    const project = yield project_1.Project.findById(projectId);
    const workflow = yield workflow_1.Workflow.findById(project.workflow).populate("states");
    const defaultStatus = workflow.states.find((state) => state.position === "-1");
    addStatus = files.map((file) => {
        return Object.assign(Object.assign({}, file), { status: defaultStatus ? defaultStatus._id : null });
    });
    try {
        const fileDocs = yield file_1.File.insertMany(addStatus);
        const fileIDs = fileDocs.map((f) => f._id);
        const project = yield project_1.Project.findByIdAndUpdate(projectId, {
            $push: { files: { $each: fileIDs } }
        });
        res.json({ status: "success", data: project });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.Upload__PROJECT_DOCUMENT__PUT = Upload__PROJECT_DOCUMENT__PUT;
const Fetch__USER_DASHBOARD_DATA__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    try {
        const studentProfile = yield models_1.User.findById(user.id).populate("supervisor");
        const userProjects = yield project_1.Project.find({
            student: user.id
        }).populate("status");
        const pendingProjects = userProjects.filter((project) => { var _a; return ((_a = project === null || project === void 0 ? void 0 : project.status) === null || _a === void 0 ? void 0 : _a.position) === "-1"; }).length;
        const approvedProjects = userProjects.filter((project) => { var _a; return ((_a = project === null || project === void 0 ? void 0 : project.status) === null || _a === void 0 ? void 0 : _a.position) === "1"; }).length;
        const ongoingProjects = userProjects.filter((project) => { var _a; return ((_a = project === null || project === void 0 ? void 0 : project.status) === null || _a === void 0 ? void 0 : _a.position) !== "1"; }).length;
        const projectsSupervisors = userProjects.map((project) => {
            return {
                project,
                supervisor: (project === null || project === void 0 ? void 0 : project.supervisor) || (studentProfile === null || studentProfile === void 0 ? void 0 : studentProfile.supervisor)
            };
        });
        return res.json({
            data: {
                ongoingProjects,
                pendingProjects,
                approvedProjects,
                projectsSupervisors
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: error.message });
    }
});
exports.Fetch__USER_DASHBOARD_DATA__GET = Fetch__USER_DASHBOARD_DATA__GET;
const Update__PROJECT__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, methodology, description } = req.body;
    const { projectId } = req.params;
    try {
        if (!projectId) {
            return res
                .status(400)
                .json({ status: "error", message: "Invalid Project ID" });
        }
        const project = yield project_1.Project.findById(projectId).populate("files");
        if (!project) {
            return res
                .status(400)
                .json({ status: "error", message: "Invalid Project" });
        }
        project.title = title;
        project.methodology = methodology;
        project.description = description;
        yield project.save();
        return res.json({ status: "success", data: project });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__PROJECT__PUT = Update__PROJECT__PUT;
const Delete__FILE__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, fileId } = req.params;
    try {
        if (projectId) {
            const project = yield project_1.Project.updateOne({ _id: projectId }, {
                $pull: { files: { $eq: fileId } }
            });
            const file = file_1.File.findByIdAndDelete(fileId);
            if (!project) {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid Project ID" });
            }
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