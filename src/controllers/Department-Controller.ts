import { Request, Response } from "express";
import { TDepartment, Department } from "../../src/models/department";
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

export const Fetch__DEPARTMENTS__GET = async (req: Request, res: Response) => {
  try {
    const departments: TDepartment[] = await Department.find();

    res.json({ status: "success", data: departments });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

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
