import { Request, Response } from "express";
import { TWorkflow, Workflow, WorkflowDoc } from "../models/workflow";
import { State, StateDoc } from "../models/state";

export const Create__STATE__POST = async (req: Request, res: Response) => {
  try {
    const { workflowId } = req.params;
    console.log(req.body);

    const { title, color, position } = req.body;

    const state: StateDoc = await State.create({
      title: title,
      color: color,
      position: position
    });

    const workflow: WorkflowDoc = await Workflow.findById(workflowId);

    workflow.states = [...workflow.states, state._id];
    await workflow.save();

    const workflowa: WorkflowDoc = await Workflow.findById(workflowId).populate(
      "states"
    );

    return res.json({ status: "success", data: workflowa.states });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__STATE__PUT = async (req: Request, res: Response) => {
  try {
    const { stateId } = req.params;
    const { title, color } = req.body;

    const state: StateDoc = await State.findById(stateId);

    // const old = await State.findOne({ defaultOrder: defaultOrder });

    // if (old) {
    //   old.defaultOrder = `${(await Workflow.find()).length}`;
    // }

    state.title = title;
    state.color = color;

    state.save();

    return res.json({ status: "success", data: state });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
