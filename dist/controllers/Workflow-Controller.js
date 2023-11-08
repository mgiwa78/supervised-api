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
exports.Update__WORKFLOW__PUT = exports.Create__WORKFLOW__POST = exports.Fetch__WORKFLOW__GET = void 0;
const workflow_1 = require("../models/workflow");
const project_1 = require("../models/project");
const Fetch__WORKFLOW__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflows = yield workflow_1.Workflow.find();
        const all = workflows.map((workflow) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const a = (yield project_1.Project.find({ status: workflow._id.toString() }))
                    .length;
                return Object.assign(Object.assign({}, workflow._doc), { count: a });
            }
            catch (error) {
                console.error(error);
            }
        }));
        const data = yield Promise.all(all);
        return res.json({ status: "success", data });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__WORKFLOW__GET = Fetch__WORKFLOW__GET;
const Create__WORKFLOW__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, color } = req.body;
        const workflow = yield workflow_1.Workflow.create({
            title: title,
            color: color
        });
        return res.json({ status: "success", data: workflow });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__WORKFLOW__POST = Create__WORKFLOW__POST;
const Update__WORKFLOW__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workflowId } = req.params;
        const { title, color, defaultOrder } = req.body;
        const workflow = yield workflow_1.Workflow.findById(workflowId);
        const old = yield workflow_1.Workflow.findOne({ defaultOrder: defaultOrder });
        if (old) {
            old.defaultOrder = `${(yield workflow_1.Workflow.find()).length}`;
        }
        workflow.title = title;
        workflow.color = color;
        workflow.defaultOrder = defaultOrder;
        workflow.save();
        return res.json({ status: "success", data: workflow });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__WORKFLOW__PUT = Update__WORKFLOW__PUT;
//# sourceMappingURL=Workflow-Controller.js.map