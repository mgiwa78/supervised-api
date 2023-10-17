import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../__CONSTANTS__";
import { User } from "../models";
import { Permission, TPermission } from "../models/permission";
import { Role, TRole } from "../models/role";

// const Permission = require("../models/permission");
// const Role = require("../models/role");

interface DecodedToken extends JwtPayload {
  userId: string;
  organization: string;
  roles: string;
  permissions: string[];
}

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", error: "No token provided" });
  }

  const decoded = jwt.verify(
    token.replace("Bearer ", ""),
    JWT_SECRET
  ) as unknown as DecodedToken;

  if (!decoded) {
    return res
      .status(409)
      .json({ status: "error", error: "Authentication is required" });
  }

  try {
    // setTimeout(() => {
    //   return res
    //     .status(409)
    //     .json({ status: "error", error: "Authentication is required" });
    // }, 9000);

    const userData = await User.findById(decoded.user._id)
      .populate("roles")
      .populate({
        path: "roles",
        populate: {
          path: "permissions"
        }
      });

    let perms: any = [];

    const userRoles = await Role.find({
      _id: { $in: userData.roles }
    }).populate("permissions");

    const permissions: any = { all: [], types: {} };

    const permissionPromises = userRoles.map(async (role: TRole) => {
      const userPerms = await Permission.find({
        _id: { $in: role.permissions }
      });

      userPerms.forEach((perms: any) => {
        permissions.all.push(perms.route);

        if (perms.types[perms.route]) {
          perms.types.forEach((e: string) => {
            permissions.types[perms.route] = [
              ...permissions.types[perms.route],
              e
            ];
          });
        } else {
          perms.types.forEach((e: string) => {
            permissions.types[perms.route] = [];
            permissions.types[perms.route] = [
              ...permissions.types[perms.route],
              e
            ];
          });
        }
      });
    });

    await Promise.all(permissionPromises);

    // userData.roles.forEach((e) =>
    //   e.permissions.forEach((e) => {
    //     permissions.push(e.route);
    //   })
    // );
    // const perms = await Permissions.find();

    if (userData) {
      req.user = {
        id: decoded.user._id,
        roles: userData.roles.map((e) => e.name),
        permissions,
        ...userData
      };
    } else {
      return res.status(401).json({ status: "error", error: "User Not Found" });
    }
    next();
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return res
      .status(409)
      .json({ status: "error", error: "Authentication is required" });
  }
};
