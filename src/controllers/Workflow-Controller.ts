import { Request, Response } from "express";
import { TWorkflow, Workflow, WorkflowDoc } from "../models/workflow";
import { Project } from "../models/project";
import { State, StateDoc, TState } from "../models/state";

export const Fetch__WORKFLOW__GET = async (req: Request, res: Response) => {
  try {
    const workflows: WorkflowDoc[] = await Workflow.find().populate("states");

    const all = workflows.map(async (workflow: any) => {
      try {
        const a = (await Project.find({ status: workflow._id.toString() }))
          .length;
        return { ...workflow._doc, count: a };
      } catch (error) {
        console.error(error);
      }
    });

    const data = await Promise.all(all);

    return res.json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Create__WORKFLOW__POST = async (req: Request, res: Response) => {
  try {
    const { title, color, description } = req.body;
    const workflow: WorkflowDoc = await Workflow.create({
      title: title,
      description: description,
      color: color
    });

    return res.json({ status: "success", data: workflow });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Delete__WORKFLOW__DELETE = async (req: Request, res: Response) => {
  try {
    const { workflowId } = req.params;
    const workflow: WorkflowDoc = await Workflow.findByIdAndDelete(workflowId);

    const statesToDelete = workflow.states;

    statesToDelete.forEach(async (id) => {
      await State.findByIdAndDelete(id);
    });

    return res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__WORKFLOW__PUT = async (req: Request, res: Response) => {
  try {
    const { workflowId } = req.params;
    const { title, color, defaultOrder, description, states } = req.body;

    const workflow: WorkflowDoc = await Workflow.findById(workflowId);

    const prevStates = workflow.states.map((w) => {
      return w.toString();
    });

    let stateToDelete: any = [];
    let stateToSave: any = [];

    prevStates.filter((s: any) => {
      if (states.includes(s)) {
        stateToSave.push(s);
      } else {
        stateToDelete.push(s);
      }
    });

    console.log(stateToDelete);
    console.log(stateToSave);

    stateToDelete.forEach(async (id: any) => {
      await State.findByIdAndDelete(id);
    });

    const old = await Workflow.findOne({ defaultOrder: defaultOrder });
    if (old) {
      old.defaultOrder = `${(await Workflow.find()).length}`;
    }

    workflow.description = description;
    workflow.title = title;
    workflow.color = color;
    workflow.defaultOrder = defaultOrder;
    workflow.states = stateToSave;

    return res.json({ status: "success", data: workflow });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
