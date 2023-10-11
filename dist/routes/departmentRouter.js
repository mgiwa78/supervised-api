"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Department_Controller_1 = require("../controllers/Department-Controller");
const departmentRouter = (0, express_1.Router)();
// departmentRouter.post(
//   "/",
//   [
//     body("name").notEmpty().withMessage("Product name is required"),
//     body("description")
//       .notEmpty()
//       .withMessage("Product description is required"),
//     body("category").notEmpty().withMessage("Category is required")
//   ],
//   ValidateRequest,
//   AuthenticateUser,
//   Create__PRODUCT__POST
// );
// departmentRouter.post(
//   "/image/:productID",
//   uploadProducts.fields([
//     { name: "profilePicture", maxCount: 1 },
//     { name: "otherPictures", maxCount: 10 }
//   ]),
//   AuthenticateUser,
//   Upload__PRODUCT_IMAGE__POST
// );
departmentRouter.get("/", Department_Controller_1.Fetch__DEPARTMENTS__GET);
// departmentRouter.put("/:productId", AuthenticateUser, Update__PRODUCT__PUT);
// departmentRouter.delete(
//   "/:productId",
//   AuthenticateUser,
//   Delete__PRODUCT__DESTROY
// );
// departmentRouter.get("/", AuthenticateUser, Fetch__DEPARTMENTS__GET);
exports.default = departmentRouter;
//# sourceMappingURL=departmentRouter.js.map