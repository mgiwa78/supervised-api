import { Request, Response } from "express";
import { DocumentDoc, Document } from "../models/document";
import { TDocument } from "../models/document";
// import mammoth from "mammoth";
// import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

import { uploadFileToStorage } from "../_utils/firebase";
import { ObjectId } from "mongodb";

export const CONVERT_CONTENT_TO_WORD_GET = async (
  req: Request,
  res: Response
) => {
  try {
    const content_url = req.body.content_url;
    // const files = req.files as FileArray;
    // if (files) {
    //   const uploadedFile: Filse = files[0] as Filse;
    //   const patsh = uploadedFile.destination + uploadedFile.filename;
    //   console.log(path);
    // mammoth
    //   .convertToHtml({ path: content_url })
    //   .then((result) => {
    //     const html = result.value;
    //     console.log(html);
    //     return res.json({ contentToHtml: html });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return res.status(500).json({ error: "Error converting file" });
    //   });
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

export const Fetch__DOCUMENTS_FOR_PROJECT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { projectId } = req.params;
    const documents: TDocument[] = await Document.find({ project: projectId });
    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Assign_Document_To__Supervisor__POST = async (
  req: Request,
  res: Response
) => {
  const { documentId } = req.params;
  const { supervisor } = req.body; // Assuming you send supervisorId in the request body
  // Find the document by its ID
  const document: DocumentDoc = await Document.findById(documentId);

  if (document) {
    document.supervisors = [...document.supervisors, supervisor];
    document.save();

    return res.json({
      success: true,
      message: "Supervisor assigned successfully"
    });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Document not found" });
  }
};
export const Fetch__MY_DOCUMENTS__GET = async (req: Request, res: Response) => {
  try {
    const documents: TDocument[] = await Document.find({
      autor: req.user.id
    });

    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__Assigned_DOCUMENTS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const documents: TDocument[] = await Document.find({
      supervisors: req.user.id
    });

    res.json({ status: "success", data: documents });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Fetch__Assigned_DOCUMENT__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId } = req.params;

    const document: TDocument[] = await Document.findById(documentId);

    res.json({ status: "success", data: document });
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
  const { title, content, description, projectId } = req.body;
  try {
    const document: DocumentDoc = new Document({
      title,
      content,
      description,
      author: req.user.id,
      project: projectId
    });

    await document.save();

    res.json({ status: "success", data: document });
  } catch (error) {
    console.log(error);
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
