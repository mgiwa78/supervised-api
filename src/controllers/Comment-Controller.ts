import { Request, Response } from "express";
import { Role, RoleDoc } from "../models/role";
import { Permission, TPermission } from "../models/permission";
import { User } from "../models/user";
import { Comment } from "../models/comment";

export const Delete__COMMENT__DELETE = async (req: Request, res: Response) => {
  try {
    const { commentID } = req.params;

    await Comment.findByIdAndDelete(commentID);

    const allComments = await Comment.find().populate("author");

    return res.json({ status: "success", data: allComments });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
