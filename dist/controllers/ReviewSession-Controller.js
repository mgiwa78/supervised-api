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
exports.Fetch__REVIEWSESSION_FOR_STUDENT__GET = exports.Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = exports.COMMENT_ON__REVIEWSESSION__POST = exports.INITIALIZE_A_REVIEWSESSION__POST = void 0;
const reviewSession_1 = require("../models/reviewSession");
// Assuming you have a ReviewSession model (e.g., reviewSessionModel.js)
// Initialize a new review session
const INITIALIZE_A_REVIEWSESSION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId, supervisorId } = req.body;
        const newReviewSession = new reviewSession_1.ReviewSession({
            document: documentId,
            supervisors: [supervisorId]
        });
        yield newReviewSession.save();
        console.log(newReviewSession);
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
// Comment on an existing review session
const COMMENT_ON__REVIEWSESSION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewSessionId, comment } = req.body;
        yield reviewSession_1.ReviewSession.findByIdAndUpdate(reviewSessionId, { $push: { comments: comment } }, { new: true });
        const reviewSession = yield reviewSession_1.ReviewSession.findById(reviewSessionId);
        res.json({
            success: true,
            message: "Comment added successfully",
            data: reviewSession
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.COMMENT_ON__REVIEWSESSION__POST = COMMENT_ON__REVIEWSESSION__POST;
// Retrieve all review sessions where the supervisor exists
const Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const reviewSessions = yield reviewSession_1.ReviewSession.find({
            supervisors: { $in: { id } }
        });
        res.json({ success: true, data: reviewSessions });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET = Fetch__REVIEWSESSION_FOR_SUPERVISOR__GET;
// Retrieve all review sessions for which a student is an author
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