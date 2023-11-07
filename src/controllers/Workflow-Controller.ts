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