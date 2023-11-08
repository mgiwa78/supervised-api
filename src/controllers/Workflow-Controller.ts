import { Request, Response } from "express";
import { TWorkflow, Workflow, WorkflowDoc } from "../models/workflow";
import { Project } from "../models/project";

export const Fetch__WORKFLOW__GET = async (req: Request, res: Response) => {
  try {
    const workflows: WorkflowDoc[] = await Workflow.find();

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
    const { title, color } = req.body;
    const workflow: WorkflowDoc = await Workflow.create({
      title: title,
      color: color
    });

    return res.json({ status: "success", data: workflow });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__WORKFLOW__PUT = async (req: Request, res: Response) => {
  try {
    const { workflowId } = req.params;
    const { title, color, defaultOrder } = req.body;

    const workflow: WorkflowDoc = await Workflow.findById(workflowId);

    const old = await Workflow.findOne({ defaultOrder: defaultOrder });
    if (old) {
      old.defaultOrder = `${(await Workflow.find()).length}`;
    }

    workflow.title = title;
    workflow.color = color;
    workflow.defaultOrder = defaultOrder;

    workflow.save();

    return res.json({ status: "success", data: workflow });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
