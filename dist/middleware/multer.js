"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import multer from "multer";
// import { uploadFileToStorage } from "../_utils/firebase";
// export const uploadDocumentForConvertion = multer({
//   storage: multer.diskStorage({
//     destination: async function (req, file, cb) {
//       console.log(file);
//       try {
//         const path = await uploadFileToStorage(file);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname.split(" ").join("_"));
//     }
//   })
// });
// export const uploadProducts = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/products");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname);
//     }
//   })
// });
// export const uploadOrganizationLogo = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/organizationLogo");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname);
//     }
//   })
// });
// export const uploadCategory = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/categories");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname);
//     }
//   })
// });
// export const uploadProducts = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/products");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname);
//     }
//   })
// });
// export const uploadProducts = multer(
//   "/upload",
//   upload.single("file"),
//   (req: Request, res: Response) => {
//     const filePath = path.join(__dirname, "uploads", req.file.filename);
//     mammoth
//       .convertToHtml({ path: filePath })
//       .then((result) => {
//         const html = result.value;
//         res.json({ html });
//       })
//       .catch((error) => {
//         res.status(500).json({ error: "Error converting file" });
//       });
//   }
// );
//# sourceMappingURL=multer.js.map