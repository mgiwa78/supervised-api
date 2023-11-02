import { Request, Response } from "express";
import { ProjectDoc, Project } from "../models/project";
import { TProject } from "../models/project";
// import mammoth from "mammoth";
// import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

import { uploadFileToStorage } from "../_utils/firebase";
import { ObjectId } from "mongodb";

export const Fetch__USER__PROJECTS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const documents: TProject[] = await Project.find({ student: userId });
    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__STUDENT__PROJECTS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId } = req.params;

    const documents: TProject[] = await Project.find({
      student: studentId
    }).populate("files");
    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__ALL_PROJECTS__GET = async (req: Request, res: Response) => {
  try {
    const documents: TProject[] = await Project.find().populate("files");
    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__PROJECT__GET = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    console.log("first  documents");

    const project: TProject[] = await Project.findById(projectId)
      .populate("student")
      .populate("files");

    res.json({ status: "success", data: project });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__PROJECT_ASSIGNED__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;
    const projects = await Project.find().populate("student").populate("files");

    const assigned = projects.map((project: any) => {
      return (
        (project.student.supervisor.toString() as string) === user.id && project
      );
    });

    res.json({ status: "success", data: assigned });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Create__PROJECTS__POST = async (req: Request, res: Response) => {
  const { title, methodology, description } = req.body;
  try {
    const project: ProjectDoc = new Project({
      title,
      methodology,
      description,
      student: req.user.id,
      status: "Pending Review"
    });

    await project.save();

    res.json({ status: "success", data: project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const Update__PROJECTS__PUT = async (req: Request, res: Response) => {
  const { title, methodology, type, description } = req.body;
  const { projectID } = req.params;
  try {
    if (projectID) {
      const project: ProjectDoc = await Project.findOne({
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

      await project.save();

      return res.json({ status: "success", data: project });
    }

    return res
      .status(400)
      .json({ status: "error", message: "Invalid DocumentID" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
