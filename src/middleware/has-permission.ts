// import { AccessControlInstance } from "../services/access-control";
// import { NextFunction, Request, Response } from "express";
// import resolveUserRoles from "../_utils/resolveUserRoles";
// import { Permission } from "accesscontrol";
// import { Admin } from "mongodb";

// type Role = "Admin" | "Lecturer" | "Student";

// interface Allowed {
//   readOwn?: Permission;
//   readAny?: Permission;
//   updateOwn?: Permission;
//   updateAny?: Permission;
//   createOwn?: Permission;
//   createAny?: Permission;
//   deleteAny?: Permission;
//   deleteOwn?: Permission;
// }
// declare global {
//   namespace Express {
//     interface Request {
//       permissions: Allowed;
//     }
//   }
// }
// export const hasPermission = (action: "put" | "delete" | "fetch" | "post") => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const { user } = req;

//     const asset = req.baseUrl.replace("/", "");
//     if (!user) {
//       return res.status(403).json({ error: "Forbidden" });
//     }

//     const userRoles = await resolveUserRoles(user.id);

//     const allowed: Allowed = {};
//     if (!userRoles) {
//       return res.status(403).json({ error: "Forbidden" });
//     }

//     userRoles?.forEach((role: any) => {
//       switch (action) {
//         case "fetch":
//           if (AccessControlInstance.can(role).readOwn(asset).granted) {
//             allowed.readOwn = AccessControlInstance.can(role).readOwn(asset);
//           }
//           if (AccessControlInstance.can(role).readAny(asset).granted) {
//             allowed.readAny = AccessControlInstance.can(role).readAny(asset);
//           }
//           break;
//         case "put":
//           if (AccessControlInstance.can(role).updateOwn(asset).granted) {
//             allowed.updateOwn =
//               AccessControlInstance.can(role).updateOwn(asset);
//           }
//           if (AccessControlInstance.can(role).updateAny(asset).granted) {
//             allowed.updateAny =
//               AccessControlInstance.can(role).updateAny(asset);
//           }
//           break;
//         case "post":
//           if (AccessControlInstance.can(role).createOwn(asset).granted) {
//             allowed.createOwn =
//               AccessControlInstance.can(role).createOwn(asset);
//           }
//           if (AccessControlInstance.can(role).createAny(asset).granted) {
//             allowed.createAny =
//               AccessControlInstance.can(role).createAny(asset);
//           }
//           break;
//         case "delete":
//           if (AccessControlInstance.can(role).deleteAny(asset).granted) {
//             allowed.deleteAny =
//               AccessControlInstance.can(role).deleteAny(asset);
//           }
//           if (AccessControlInstance.can(role).deleteOwn(asset).granted) {
//             allowed.deleteOwn =
//               AccessControlInstance.can(role).deleteOwn(asset);
//           }
//           break;
//       }
//     });
//     if (Object.keys(allowed).length) {
//       req.permissions = allowed;
//       next();
//     } else {
//       return res.status(403).json({ error: "Forbidden" });
//     }
//   };
// };
import { Request, Response, NextFunction } from "express";

export const hasPermission = (action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      // const roles = await Role.find({ _id: { $in: user.roles } })
      //   .populate("permissions")
      //   .exec();
      const hasPermission = user.permissions.all.includes(action);
      if (hasPermission) {
        return next();
      }

      return res.status(403).json({ message: "Permission denied" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
