"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocumentForConvertion = void 0;
const multer_1 = __importDefault(require("multer"));
exports.uploadDocumentForConvertion = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/docs");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + "-" + file.originalname.split(" ").join("_"));
        }
    })
});
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