import { Request, Response } from "express";
import { Role, RoleDoc } from "../models/role";
import { Permission, TPermission } from "../models/permission";
import { User } from "../models/user";
import { Comment } from "../models/comment";
import { ReviewSession } from "../models/reviewSession";

export const Delete__COMMENT__DELETE = async (req: Request, res: Response) => {
  try {
    const { commentID, reviewSessionId } = req.params;

    const reviewSession = await ReviewSession.findByIdAndUpdate(
      reviewSessionId,
      { $pull: { comments: commentID } },
      { new: true }
    );
    reviewSession.save();

    await Comment.findByIdAndDelete(commentID);

    return res.json({ status: "success", data: reviewSession.comments });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
