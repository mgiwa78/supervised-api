import { Request, Response } from "express";
import { ProjectDoc, Project } from "../models/project";
import { TProject } from "../models/project";
// import mammoth from "mammoth";
// import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

import { uploadFileToStorage } from "../_utils/firebase";
import { ObjectId } from "mongodb";
import { User } from "../models";

export const Fetch__USER__PROJECTS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const documents: TProject[] = await Project.find({
      student: userId
    }).populate("status");
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
    console.log("first");
    const { studentId } = req.params;

    const documents: TProject[] = await Project.find({
      student: studentId
    })
      .populate("files")

      .populate("workflow");
    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__ALL_PROJECTS__GET = async (req: Request, res: Response) => {
  try {
    const documents: TProject[] = await Project.find()
      .populate("files")

      .populate("workflow");
    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__PROJECT__GET = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const project: TProject[] = await Project.findById(projectId)
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

    const assignedStudents = await User.find({ supervisor: user.id });

    const assignedStudentIds = assignedStudents.map((student) => student._id);

    const projects = await Project.find({
      $or: [{ student: { $in: assignedStudentIds } }, { supervisor: user.id }]
    })
      .populate("student")
      .populate("files")
      .populate("workflow");

    const assigned = projects?.map((project: any) => {
      return (
        project.student?.supervisor &&
        project.student?.supervisor?.toString() === user.id &&
        project
      );
    });

    res.json({ status: "success", data: assigned });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Create__PROJECTS__POST = async (req: Request, res: Response) => {
  const { title, methodology, student, description, supervisor } = req.body;
  try {
    const project: ProjectDoc = new Project({
      title,
      methodology,
      description,
      student: student ? student : req.user.id,
      status: "Pending Review",
      ...(supervisor && { supervisor: supervisor })
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
      .json({ status: "error", message: "Invalid DocumentIddD" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Delete__FILE__DELETE = async (req: Request, res: Response) => {
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
