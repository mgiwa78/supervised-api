import { Request, Response } from "express";
import { Role, RoleDoc } from "../models/role";
import { Permission, TPermission } from "../models/permission";
import { User } from "../models/user";

export const Fetch__ROLES__GET = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find().populate("permissions").exec();

    return res.json({ status: "success", data: roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
export const Fetch__ROLES_WITH_USERS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const roles = await Role.find().populate("permissions").exec();
    const users = await User.find().populate("roles").exec();

    const all: any = [];

    roles.forEach((role) => {
      const countUsers = users.filter((user) =>
        user.roles.some((rol) => rol.name === role.name)
      ).length;

      all.push({ role: role, countUsers });
    });

    return res.json({ status: "success", data: all });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Create__ROLES__POST = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  try {
    const pe = await Permission.find();

    let newRolePerms: Array<TPermission> = [];
    pe.forEach((p) => {
      if (permissions[p._id] && permissions[p._id].state) {
        newRolePerms.push(p._id);
      }
    });
    console.log(newRolePerms);
    const role: RoleDoc = new Role({ name, permissions: newRolePerms });

    await role.save();
    return res.status(201).json({ message: "Role created successfully" });
  } catch (error) {
    console.error("Error creating role:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
export const Update__ROLES__PUT = async (req: Request, res: Response) => {
  const { _id, name, status } = req.body;

  try {
    const pe = await Permission.find();
    const Trole = await Role.findById(_id);

    let newRolePerms: Array<TPermission> = [];

    pe.forEach((p) => {
      if (status[p._id] && status[p._id].state) {
        newRolePerms.push(p._id);
      }
    });
    Trole.name = name;
    Trole.permissions = newRolePerms;

    await Trole.save();
    return res.status(201).json({ message: "Role Updated successfully" });
  } catch (error) {
    console.error("Error creating role:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
