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
exports.Update__STATE__PUT = exports.Create__STATE__POST = void 0;
const workflow_1 = require("../models/workflow");
const state_1 = require("../models/state");
const Create__STATE__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workflowId } = req.params;
        console.log(req.body);
        const { title, color, position } = req.body;
        const state = yield state_1.State.create({
            title: title,
            color: color,
            position: position
        });
        const workflow = yield workflow_1.Workflow.findById(workflowId);
        workflow.states = [...workflow.states, state._id];
        yield workflow.save();
        const workflowa = yield workflow_1.Workflow.findById(workflowId).populate("states");
        return res.json({ status: "success", data: workflowa.states });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__STATE__POST = Create__STATE__POST;
const Update__STATE__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stateId } = req.params;
        const { title, color } = req.body;
        const state = yield state_1.State.findById(stateId);
        // const old = await State.findOne({ defaultOrder: defaultOrder });
        // if (old) {
        //   old.defaultOrder = `${(await Workflow.find()).length}`;
        // }
        state.title = title;
        state.color = color;
        state.save();
        return res.json({ status: "success", data: state });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__STATE__PUT = Update__STATE__PUT;
//# sourceMappingURL=State-Controller.js.map