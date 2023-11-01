import { Request, Response } from "express";
import { DocumentDoc, Document } from "../models/document";
import { TDocument } from "../models/document";
import path from "path";

import { uploadFileToStorage } from "../_utils/firebase";
import { ObjectId } from "mongodb";
import { ReviewSession } from "../models/reviewSession";
import { Comment } from "../models/comment";

export const INITIALIZE_A_REVIEWSESSION__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId, supervisorId } = req.body;
    const doc = await Document.findById(documentId);

    const newReviewSession = new ReviewSession({
      document: documentId,
      supervisors: [supervisorId],
      content: doc.content
    });

    await newReviewSession.save();

    res.json({
      success: true,
      message: "Review session initialized successfully",
      data: newReviewSession
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const COMMENT_ON__REVIEWSESSION__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { comment } = req.body;
    const { reviewSessionId } = req.params;

    const newComment = new Comment({
      content: comment,
      author: req.user.id
    });

    newComment.save();

    // const s = await Comment.findById("65310acd9dec635b7ba9794e");

    await ReviewSession.updateOne(
      { _id: reviewSessionId },
      {
        $push: { comments: newComment._id }
      }
    );

    const reviewSession = await ReviewSession.findById(reviewSessionId)
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author"
        }
      });

    res.json({
      success: true,
      message: "Comment added successfully",
      data: reviewSession.comments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.user;

    const reviewSessions = await ReviewSession.find({
      supervisors: { $in: id }
    })
      .populate("document")
      .populate({
        path: "document",
        populate: {
          path: "author"
        }
      })
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author"
        }
      });

    res.json({ success: true, data: reviewSessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT = async (
  req: Request,
  res: Response
) => {
  try {
    const { content, comments } = req.body;
    const { id } = req.user;
    const { reviewSessionId } = req.params;

    const reviewSession = await ReviewSession.findById(reviewSessionId);

    reviewSession.content = content;
    reviewSession.save();

    const UpreviewSession = await ReviewSession.findById(reviewSessionId)
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author"
        }
      })
      .exec();

    res.json({ success: true, data: reviewSession });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { reviewSessionId } = req.params;

    if (!reviewSessionId) {
      return res.status(404).json({
        success: true,
        message: "Review Session Id is required"
      });
    }

    const reviewSession = await ReviewSession.findOne({
      _id: reviewSessionId
    });

    if (!reviewSession) {
      return res.status(404).json({
        success: false,
        message: "Invalid Review-session ID"
      });
    }

    res.json({ success: true, data: reviewSession });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const Fetch_BY_DOCUMENT_ID_REVIEWSESSION_FOR_SUPERVISOR__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId } = req.params;

    if (!documentId) {
      return res.status(404).json({
        success: true,
        message: "Document Id is required"
      });
    }

    const reviewSession = await ReviewSession.findOne({
      document: documentId
    })
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author"
        }
      });

    if (!reviewSession) {
      const document = await Document.findById(documentId);

      if (!document)
        return res.status(404).json({
          success: false,
          message: "Invalid Document Id"
        });

      const reviewSession = await ReviewSession.create({
        document: documentId,
        content: document.content
      });
      return res.json({ success: true, data: reviewSession });
    }

    return res.json({ success: true, data: reviewSession });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const Fetch__REVIEWSESSION_FOR_STUDENT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.user;

    const reviewSessions = await ReviewSession.find({
      document: {
        $in: await Document.find({ author: id }).distinct("_id")
      }
    })
      .populate("document")
      .populate({
        path: "document",
        populate: {
          path: "author"
        }
      });

    res.json({ success: true, data: reviewSessions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
