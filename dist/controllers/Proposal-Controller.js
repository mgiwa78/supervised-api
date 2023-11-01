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
exports.PUT_APPROVE_PROPOSAL__POST = exports.Upload__PROPOSAL_FILE__PUT = exports.Create__PROPOSAL__POST = exports.Fetch__PROPOSAL__GET = exports.Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET = exports.Fetch__USER__PROPOSAL__GET = void 0;
const project_1 = require("../models/project");
const proposal_1 = require("../models/proposal");
const models_1 = require("../models");
const file_1 = require("../models/file");
const Fetch__USER__PROPOSAL__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const proposals = yield proposal_1.ProjectProposal.find({
            student: userId
        }).populate("files");
        res.json({ status: "success", data: proposals });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__USER__PROPOSAL__GET = Fetch__USER__PROPOSAL__GET;
const Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const userDepartment = req.user.department;
        const students = yield models_1.User.find({
            department: userDepartment
        });
        const studentIds = students.map((student) => student._id);
        const facultyAdminProposals = yield proposal_1.ProjectProposal.find({
            student: { $in: studentIds }
        }).populate("files");
        res.json({ status: "success", data: facultyAdminProposals });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET = Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET;
const Fetch__PROPOSAL__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { proposalId } = req.params;
        const proposal = yield proposal_1.ProjectProposal.findById(proposalId)
            .populate("student")
            .populate("files");
        res.json({ status: "success", data: proposal });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__PROPOSAL__GET = Fetch__PROPOSAL__GET;
const Create__PROPOSAL__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, methodology, description, files, objectives, timeline } = req.body;
    try {
        const projectProposal = new proposal_1.ProjectProposal({
            title,
            methodology,
            objectives,
            description,
            files,
            timeline,
            student: req.user.id,
            status: "Pending Review"
        });
        yield projectProposal.save();
        res.json({ status: "success", data: projectProposal });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.Create__PROPOSAL__POST = Create__PROPOSAL__POST;
const Upload__PROPOSAL_FILE__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req.body;
    const { proposalId } = req.params;
    try {
        const fileDocs = yield file_1.File.insertMany(files);
        const fileIDs = fileDocs.map((f) => f._id);
        console.log(fileIDs);
        const projectProposal = yield proposal_1.ProjectProposal.findByIdAndUpdate(proposalId, {
            files: fileIDs
        });
        res.json({ status: "success", data: projectProposal });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.Upload__PROPOSAL_FILE__PUT = Upload__PROPOSAL_FILE__PUT;
const PUT_APPROVE_PROPOSAL__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, methodology, description, student, _id } = req.body;
    try {
        const proposal = yield proposal_1.ProjectProposal.findById(_id);
        if (proposal.status !== "Approved") {
            proposal.status = "Approved";
            proposal.save();
            const project = new project_1.Project({
                title,
                methodology,
                files: proposal.files,
                description,
                student: student,
                status: "Pending Review"
            });
            yield project.save();
            res.json({ status: "success", data: project });
        }
        else {
            res
                .status(500)
                .json({ status: "error", message: "Proposal has been approved" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.PUT_APPROVE_PROPOSAL__POST = PUT_APPROVE_PROPOSAL__POST;
//# sourceMappingURL=Proposal-Controller.js.map