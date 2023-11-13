import { Request, Response } from "express";
import { ProjectDoc, Project } from "../models/project";
import {
  ProjectProposal,
  ProjectProposalDoc,
  TProjectProposal
} from "../models/proposal";
// import mammoth from "mammoth";
// import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

import { uploadFileToStorage } from "../_utils/firebase";
import { ObjectId } from "mongodb";
import { User } from "../models";
import { TUser, UserDoc } from "../models/user";
import { File, FileDoc, TFile } from "../models/file";
import { Workflow } from "../models/workflow";

export const Fetch__USER__PROPOSAL__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const proposals: TProjectProposal[] = await ProjectProposal.find({
      student: userId
    }).populate("files");
    res.json({ status: "success", data: proposals });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__SUBMITTED_PROPOSALS_SUPERVISOR__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const userDepartment = req.user.department;

    const students: UserDoc[] = await User.find({
      department: userDepartment
    });
    const studentIds = students.map((student) => student._id);

    const facultyAdminProposals: TUser[] = await ProjectProposal.find({
      student: { $in: studentIds }
    }).populate("files");

    res.json({ status: "success", data: facultyAdminProposals });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__PROPOSAL__GET = async (req: Request, res: Response) => {
  try {
    const { proposalId } = req.params;
    const proposal: TProjectProposal = await ProjectProposal.findById(
      proposalId
    )
      .populate("student")
      .populate("files");
    res.json({ status: "success", data: proposal });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Create__PROPOSAL__POST = async (req: Request, res: Response) => {
  const { title, methodology, description, files, objectives, timeline } =
    req.body;
  try {
    const projectProposal: ProjectProposalDoc = new ProjectProposal({
      title,
      methodology,
      objectives,
      description,
      files,
      timeline,
      student: req.user.id,
      status: "Pending Review"
    });

    await projectProposal.save();

    res.json({ status: "success", data: projectProposal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const Upload__PROPOSAL_FILE__PUT = async (
  req: Request,
  res: Response
) => {
  const { files } = req.body;
  const { proposalId } = req.params;
  let addStatus;
  const workflow = await Workflow.findOne({ defaultOrder: "-1" });

  addStatus = files.map((file: any) => {
    return { ...file, status: workflow ? workflow._id : null };
  });

  try {
    const fileDocs = await File.insertMany(addStatus);

    const fileIDs = fileDocs.map((f) => f._id);

    const projectProposal: ProjectProposalDoc =
      await ProjectProposal.findByIdAndUpdate(proposalId, {
        files: fileIDs
      });

    res.json({ status: "success", data: projectProposal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const PUT_APPROVE_PROPOSAL__POST = async (
  req: Request,
  res: Response
) => {
  const { title, methodology, workflow, description, student, _id } = req.body;

  try {
    const proposal = await ProjectProposal.findById(_id);
    const workflowData = await Workflow.findById(workflow).populate("states");

    console.log(workflow);
    console.log(workflowData);
    workflowData.states.find((state) => state.position === "-1");

    if (proposal.status !== "Approved") {
      const project: ProjectDoc = new Project({
        title,
        methodology,
        files: proposal.files,
        description,
        workflow: workflowData,
        student: student,
        status: "Pending"
      });

      await project.save();

      proposal.status = "Approved";
      proposal.save();
      res.json({ status: "success", data: project });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Proposal has been approved" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
