import { Request, Response } from "express";
import { TDepartment, Department } from "../models/department";
import { File, FileDoc, TFile } from "../models/file";

export const Fetch__DEPARTMENTS__GET = async (req: Request, res: Response) => {
  try {
    const departments: TDepartment[] = await Department.find();

    res.json({ status: "success", data: departments });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__FILE__GET = async (req: Request, res: Response) => {
  try {
    const { fileID } = req.params;
    const file: FileDoc = await File.findById(fileID);

    res.json({ status: "success", data: file });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
