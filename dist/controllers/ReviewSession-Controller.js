"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch__REVIEWSESSION_FOR_STUDENT__GET = exports.Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = exports.Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT = exports.Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET = exports.COMMENT_ON__REVIEWSESSION__POST = exports.INITIALIZE_A_REVIEWSESSION__POST = void 0;
const document_1 = require("../models/document");
const reviewSession_1 = require("../models/reviewSession");
const comment_1 = require("../models/comment");
const INITIALIZE_A_REVIEWSESSION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId, supervisorId } = req.body;
        const doc = yield document_1.Document.findById(documentId);
        const newReviewSession = new reviewSession_1.ReviewSession({
            document: documentId,
            supervisors: [supervisorId],
            content: doc.content
        });
        yield newReviewSession.save();
        res.json({
            success: true,
            message: "Review session initialized successfully",
            data: newReviewSession
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.INITIALIZE_A_REVIEWSESSION__POST = INITIALIZE_A_REVIEWSESSION__POST;
const COMMENT_ON__REVIEWSESSION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body;
        const { reviewSessionId } = req.params;
        console.log(req.user);
        const newComment = new comment_1.Comment({
            content: comment,
            author: req.user.id
        });
        newComment.save();
        // const s = await Comment.findById("65310acd9dec635b7ba9794e");
        // console.log(s);
        yield reviewSession_1.ReviewSession.updateOne({ _id: reviewSessionId }, {
            $push: { comments: newComment._id }
        });
        const reviewSession = yield reviewSession_1.ReviewSession.findById(reviewSessionId)
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.COMMENT_ON__REVIEWSESSION__POST = COMMENT_ON__REVIEWSESSION__POST;
const Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        console.log("firssaddat");
        const reviewSessions = yield reviewSession_1.ReviewSession.find({
            supervisors: { $in: id }
        })
            .populate("comments")
            .populate({
            path: "comments",
            populate: {
                path: "author"
            }
        });
        console.log("firssaasdsadadefddat");
        res.json({ success: true, data: reviewSessions });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET = Fetch__REVIEWSESSIONS_FOR_SUPERVISOR__GET;
const Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, comments } = req.body;
        const { id } = req.user;
        const { reviewSessionId } = req.params;
        const reviewSession = yield reviewSession_1.ReviewSession.findById(reviewSessionId);
        reviewSession.content = content;
        reviewSession.save();
        const UpreviewSession = yield reviewSession_1.ReviewSession.findById(reviewSessionId)
            .populate("comments")
            .populate({
            path: "comments",
            populate: {
                path: "author"
            }
        })
            .exec();
        console.log(UpreviewSession);
        res.json({ success: true, data: reviewSession });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT = Update__REVIEWSESSIONS_FOR_SUPERVISOR__PUT;
const Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { reviewSessionId } = req.params;
        if (!reviewSessionId) {
            return res.status(404).json({
                success: true,
                message: "Review Session Id is required"
            });
        }
        const reviewSession = yield reviewSession_1.ReviewSession.findOne({
            supervisors: { $in: id },
            _id: reviewSessionId
        })
            .populate("comments")
            .populate({
            path: "comments",
            populate: {
                path: "author"
            }
        });
        if (!reviewSession) {
            return res.status(404).json({
                success: false,
                message: "Invalid Review-session ID"
            });
        }
        res.json({ success: true, data: reviewSession });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET;
const Fetch__REVIEWSESSION_FOR_STUDENT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const reviewSessions = yield reviewSession_1.ReviewSession.find({
            "document.authorId": studentId
        }).populate("document");
        res.json({ success: true, reviewSessions });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.Fetch__REVIEWSESSION_FOR_STUDENT__GET = Fetch__REVIEWSESSION_FOR_STUDENT__GET;
//# sourceMappingURL=ReviewSession-Controller.js.map