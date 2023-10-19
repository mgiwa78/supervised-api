import { Request, Response } from "express";
import { DocumentDoc, Document } from "../models/document";
import { TDocument } from "../models/document";
// import mammoth from "mammoth";
// import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

import { uploadFileToStorage } from "../_utils/firebase";
import { ObjectId } from "mongodb";
import { ReviewSession } from "../models/reviewSession";

// Assuming you have a ReviewSession model (e.g., reviewSessionModel.js)

// Initialize a new review session
export const INITIALIZE_A_REVIEWSESSION__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId, supervisorId } = req.body;
    const newReviewSession = new ReviewSession({
      document: documentId,
      supervisors: [supervisorId]
    });

    await newReviewSession.save();

    console.log(newReviewSession);
    res.json({
      success: true,
      message: "Review session initialized successfully",
      data: newReviewSession
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Comment on an existing review session
export const COMMENT_ON__REVIEWSESSION__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { reviewSessionId, comment } = req.body;
    await ReviewSession.findByIdAndUpdate(
      reviewSessionId,
      { $push: { comments: comment } },
      { new: true }
    );

    const reviewSession = await ReviewSession.findById(reviewSessionId);

    res.json({
      success: true,
      message: "Comment added successfully",
      data: reviewSession
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all review sessions where the supervisor exists
export const Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.user;

    const reviewSessions = await ReviewSession.find({
      supervisors: { $in: { id } }
    });

    res.json({ success: true, data: reviewSessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all review sessions for which a student is an author
export const Fetch__REVIEWSESSION_FOR_STUDENT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId } = req.params;

    const reviewSessions = await ReviewSession.find({
      "document.authorId": studentId
    }).populate("document");

    res.json({ success: true, reviewSessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
