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
exports.Fetch__DEPARTMENTS__GET = void 0;
const department_1 = require("../../src/models/department");
// Create a new product
// export const Create__PRODUCT__POST = async (req: Request, res: Response) => {
//   try {
//     const user = req.user;
//     const { name, description, category, price } = req.body;
//     const organization = await Organization.findById(user.organization);
//     const product: Product = await Product.create({
//       name,
//       description,
//       category,
//       organization,
//       price
//     });
//     res.status(201).json({ status: "success", data: product });
//   } catch (error) {
//     res.status(500).json({ status: "error", error: error.message });
//   }
// };
// export const Upload__PRODUCT_IMAGE__POST = async (
//   req: Request,
//   res: Response
// ) => {
//   const ID = req.params.productID;
//   const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//   const product = await Product.findById(ID);
//   if (!product) {
//     return res
//       .status(400)
//       .json({ statuproducts: "error", message: "Invalid Product ID" });
//   }
//   if (files["profilePicture"]?.[0]) {
//     const profilePictureFile = files["profilePicture"]?.[0];
//     product.profilePicture = "products/" + profilePictureFile.filename;
//   }
//   if (files["otherPictures"]) {
//     const otherPicturesFiles = files["otherPictures"];
//     otherPicturesFiles.forEach((e) => product.otherPictures.push(e.filename));
//   } else {
//     return res
//       .status(400)
//       .json({ statuproducts: "error", message: "No Image Selected" });
//   }
//   product.save();
//   return res.json({
//     message: "Files uploaded successfully!"
//   });
// };
const Fetch__DEPARTMENTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield department_1.Department.find();
        res.json({ status: "success", data: departments });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__DEPARTMENTS__GET = Fetch__DEPARTMENTS__GET;
// Get a single product by ID
// export const Fetch__PRODUCT__GET = async (req: Request, res: Response) => {
//   try {
//     const productId: string = req.params.productId;
//     const product: Product | null = await Product.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ status: "error", error: "Product not found" });
//     }
//     res.json({ status: "success", data: product });
//   } catch (error) {
//     res.status(500).json({ status: "error", error: error.message });
//   }
// };
// // Update a product by ID
// export const Update__PRODUCT__PUT = async (req: Request, res: Response) => {
//   try {
//     const productId: string = req.params.productId;
//     const { name, description, pictures } = req.body;
//     const updatedProduct: Product | null = await Product.findByIdAndUpdate(
//       productId,
//       { name, description, pictures },
//       { new: true }
//     );
//     if (!updatedProduct) {
//       return res
//         .status(404)
//         .json({ status: "error", error: "Product not found" });
//     }
//     res.json({ status: "success", data: updatedProduct });
//   } catch (error) {
//     res.status(500).json({ status: "error", error: error.message });
//   }
// };
// // Delete a product by ID
// export const Delete__PRODUCT__DESTROY = async (req: Request, res: Response) => {
//   try {
//     const productId: string = req.params.productId;
//     const deletedProduct: Product | null = await Product.findByIdAndDelete(
//       productId
//     );
//     if (!deletedProduct) {
//       return res
//         .status(404)
//         .json({ status: "error", error: "Product not found" });
//     }
//     res.json({ status: "success", data: deletedProduct });
//   } catch (error) {
//     res.status(500).json({ status: "error", error: error.message });
//   }
// };
//# sourceMappingURL=Department-Controller.js.map