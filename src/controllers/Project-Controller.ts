import { Request, Response } from "express";
import { ProjectDoc, Project } from "../models/project";
import { TProject } from "../models/project";
// import mammoth from "mammoth";
// import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

import { uploadFileToStorage } from "../_utils/firebase";
import { ObjectId } from "mongodb";
import { User } from "../models";
import { File } from "../models/file";
import { Workflow } from "../models/workflow";
import { ProjectProposal } from "../models/proposal";
import { Send__NOTIFICATION } from "./Notification-Controller";

export const Fetch__USER__PROJECTS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    Send__NOTIFICATION(userId);
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

export const Upload__PROJECT_DOCUMENT__PUT = async (
  req: Request,
  res: Response
) => {
  const { files } = req.body;
  const { projectId } = req.params;
  let addStatus;
  const workflow = await Workflow.findOne({ defaultOrder: "-1" });

  addStatus = files.map((file: any) => {
    return { ...file, status: workflow ? workflow._id : null };
  });

  try {
    const fileDocs = await File.insertMany(addStatus);

    const fileIDs = fileDocs.map((f) => f._id);

    const project: ProjectDoc = await Project.findByIdAndUpdate(projectId, {
      $push: { files: { $each: fileIDs } }
    });

    res.json({ status: "success", data: project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const Fetch__USER_DASHBOARD_DATA__GET = async (
  req: Request,
  res: Response
) => {
  const { user } = req;

  try {
    const studentProfile = await User.findById(user.id).populate("supervisor");

    const userProjects: Array<ProjectDoc> = await Project.find({
      student: user.id
    }).populate("status");

    const pendingProjects = userProjects.filter(
      (project) => project?.status?.position === "-1"
    ).length;

    const approvedProjects = userProjects.filter(
      (project) => project?.status?.position === "1"
    ).length;

    const ongoingProjects = userProjects.filter(
      (project) => project?.status?.position === "0"
    ).length;

    const projectsSupervisors = userProjects.map((project) => {
      return {
        project,
        supervisor: project?.supervisor || studentProfile?.supervisor
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const Update__PROJECT__PUT = async (req: Request, res: Response) => {
  const { title, methodology, description } = req.body;
  const { projectId } = req.params;
  try {
    if (!projectId) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Project ID" });
    }

    const project: ProjectDoc = await Project.findById(projectId).populate(
      "files"
    );

    if (!project) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Project" });
    }

    project.title = title;
    project.methodology = methodology;
    project.description = description;

    await project.save();

    return res.json({ status: "success", data: project });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Delete__FILE__DELETE = async (req: Request, res: Response) => {
  const { projectId, fileId } = req.params;
  try {
    if (projectId) {
      const project = await Project.updateOne(
        { _id: projectId },
        {
          $pull: { files: { $eq: fileId } }
        }
      );

      const file = File.findByIdAndDelete(fileId);

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
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
