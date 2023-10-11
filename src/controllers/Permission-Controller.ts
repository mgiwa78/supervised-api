import { Request, Response } from "express";
import { Permission, PermissionDoc } from "../models/permission";
import { User } from "../models/user";
import { Role } from "../models/role";

export const Fetch__PERMISSIONS__GET = async (req: Request, res: Response) => {
  try {
    const permissions = await Permission.find();
    return res.json({ status: "success", data: permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
export const Fetch__PERMISSIONS_WITH_ROLES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const permissions = await Permission.find();
    const roles = await Role.find();

    const all = permissions.map((perm) => {
      const r = roles.filter((role) => role.permissions.includes(perm._id));

      return {
        permission: perm,
        roles: r
      };
    });

    return res.json({ status: "success", data: all });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Create__PERMISSION__POST = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const permission: PermissionDoc = new Permission({ name });
    await permission.save();
    return res.status(201).json({ message: "Permission created successfully" });
  } catch (error) {
    console.error("Error creating permission:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
