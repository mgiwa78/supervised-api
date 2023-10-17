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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update__DOCUMENT__PUT = exports.Create__DOCUMENT__POST = exports.Fetch__MY_DOCUMENT__GET = exports.Fetch__MY_DOCUMENTS__GET = exports.Fetch__DOCUMENTS__GET = exports.CONVERT_CONTENT_TO_WORD_GET = void 0;
const document_1 = require("../models/document");
const mammoth_1 = __importDefault(require("mammoth"));
const path_1 = __importDefault(require("path"));
const CONVERT_CONTENT_TO_WORD_GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        if (files) {
            const uploadedFile = files[0];
            const patsh = uploadedFile.destination + uploadedFile.filename;
            const filePath = path_1.default.join(uploadedFile.destination, uploadedFile.filename);
            console.log(uploadedFile);
            mammoth_1.default
                .convertToHtml({ path: filePath })
                .then((result) => {
                const html = result.value;
                console.log(html);
                return res.json({ contentToHtml: html });
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: "Error converting file" });
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during file upload.");
    }
});
exports.CONVERT_CONTENT_TO_WORD_GET = CONVERT_CONTENT_TO_WORD_GET;
const Fetch__DOCUMENTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documents = yield document_1.Document.find();
        res.json({ status: "success", data: documents });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__DOCUMENTS__GET = Fetch__DOCUMENTS__GET;
const Fetch__MY_DOCUMENTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const documents = yield document_1.Document.find({
            autor: req.user.id
        });
        res.json({ status: "success", data: documents });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__MY_DOCUMENTS__GET = Fetch__MY_DOCUMENTS__GET;
const Fetch__MY_DOCUMENT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.documentID) {
            const document = yield document_1.Document.findById(req.params.documentID);
            if (document) {
                return res.json({ status: "success", data: document });
            }
            return res
                .status(400)
                .json({ status: "error", message: "Invalid DocumentID" });
        }
        return res
            .status(400)
            .json({ status: "error", message: "Invalid DocumentID" });
    }
    catch (error) {
        return res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__MY_DOCUMENT__GET = Fetch__MY_DOCUMENT__GET;
const Create__DOCUMENT__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, description } = req.body;
    console.log(title);
    try {
        const document = new document_1.Document({
            title,
            content,
            description,
            author: req.user.id
        });
        yield document.save();
        res.json({ status: "success", data: document });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__DOCUMENT__POST = Create__DOCUMENT__POST;
const Update__DOCUMENT__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, description } = req.body;
    const { documentID } = req.params;
    try {
        if (documentID) {
            const document = yield document_1.Document.findOne({
                _id: req.params.documentID,
                author: req.user.id
            });
            if (!document) {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid DocumentID" });
            }
            document.title = title;
            document.content = content;
            document.description = description;
            yield document.save();
            return res.json({ status: "success", data: document });
        }
        return res
            .status(400)
            .json({ status: "error", message: "Invalid DocumentID" });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__DOCUMENT__PUT = Update__DOCUMENT__PUT;
//# sourceMappingURL=Document-Controller.js.map