import { Request, Response } from "express";
import { DocumentDoc, Document } from "../models/document";
import { TDocument } from "../models/document";
import mammoth from "mammoth";
import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

type File = {
  name: string;
  destination: string;
  filename: string;
};
export const CONVERT_CONTENT_TO_WORD_GET = async (
  req: Request,
  res: Response
) => {
  try {
    const files = req.files.content as any;
    if (files) {
      const uploadedFile = files[0];
      const patsh = uploadedFile.destination + uploadedFile.filename;

      const filePath = path.join(
        uploadedFile.destination,
        uploadedFile.filename
      );
      console.log(uploadedFile);
      mammoth
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
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during file upload.");
  }
};

export const Fetch__DOCUMENTS__GET = async (req: Request, res: Response) => {
  try {
    const documents: TDocument[] = await Document.find();
    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__MY_DOCUMENTS__GET = async (req: Request, res: Response) => {
  try {
    console.log(req.user);

    const documents: TDocument[] = await Document.find({
      autor: req.user.id
    });

    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__MY_DOCUMENT__GET = async (req: Request, res: Response) => {
  try {
    if (req.params.documentID) {
      const document: TDocument = await Document.findById(
        req.params.documentID
      );

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
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};

export const Create__DOCUMENT__POST = async (req: Request, res: Response) => {
  const { title, content, description } = req.body;
  console.log(title);
  try {
    const document: DocumentDoc = new Document({
      title,
      content,
      description,
      author: req.user.id
    });

    await document.save();

    res.json({ status: "success", data: document });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Update__DOCUMENT__PUT = async (req: Request, res: Response) => {
  const { title, content, description } = req.body;
  const { documentID } = req.params;
  try {
    if (documentID) {
      const document: DocumentDoc = await Document.findOne({
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

      await document.save();

      return res.json({ status: "success", data: document });
    }

    return res
      .status(400)
      .json({ status: "error", message: "Invalid DocumentID" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
