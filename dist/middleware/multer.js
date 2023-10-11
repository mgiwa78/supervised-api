"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProducts = exports.uploadCategory = exports.uploadOrganizationLogo = exports.uploadRoomBanner = void 0;
const multer_1 = __importDefault(require("multer"));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "productImages/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });
// export const upload = multer({ dest: "uploads/" });
// // export const upload = multer({ storage: storage });
exports.uploadRoomBanner = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/roomsBanner");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    })
});
exports.uploadOrganizationLogo = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/organizationLogo");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    })
});
exports.uploadCategory = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/categories");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    })
});
exports.uploadProducts = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/products");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    })
});
//# sourceMappingURL=multer.js.map