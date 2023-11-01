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
exports.Delete__COMMENT__DELETE = void 0;
const comment_1 = require("../models/comment");
const reviewSession_1 = require("../models/reviewSession");
const Delete__COMMENT__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentID, reviewSessionId } = req.params;
        const reviewSession = yield reviewSession_1.ReviewSession.findByIdAndUpdate(reviewSessionId, { $pull: { comments: commentID } }, { new: true });
        reviewSession.save();
        yield comment_1.Comment.findByIdAndDelete(commentID);
        return res.json({ status: "success", data: reviewSession.comments });
    }
    catch (error) {
        console.error("Error fetching roles:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Delete__COMMENT__DELETE = Delete__COMMENT__DELETE;
//# sourceMappingURL=Comment-Controller.js.map