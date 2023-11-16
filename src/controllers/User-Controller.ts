import { Request, Response } from "express";
import { TUser, User } from "../models/user";
import { Password } from "../services/password";
import { Role } from "../models/role";

// Fetch users for an organization
export const Fetch__ORGANIZATIONS_USERS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.params.organizationId;

    const users = await User.find({ organization: organizationId });

    return res.json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching organization users:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Fetch all users for an admin
export const Fetch__USERS__GET = async (req: Request, res: Response) => {
  try {
    const allUsers: any = [];
    const users = await User.find()
      .populate("department")
      .populate("roles")
      .populate({
        path: "roles",
        populate: {
          path: "permissions"
        }
      });
    if (req.user.permissions.types["getAllUsers"]) {
      await Promise.all(
        req.user.permissions.types["getAllUsers"].map(async (e) => {
          console.log(e.toString());

          const r = await Role.findById(e);

          const us = await User.find({
            roles: { $in: e }
          })
            .populate("department")
            .populate("roles")
            .populate({
              path: "roles",
              populate: {
                path: "permissions"
              }
            });

          console.log(us);

          allUsers.push(...us);
        })
      );

      return res.json({ status: "success", data: allUsers });
    }

    return res.json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Fetch__SUPERVISORS__GET = async (req: Request, res: Response) => {
  try {
    const { onDepartment } = req.query;

    const supervisorRole = await Role.findOne({ name: "Supervisor" });
    const supervisors = await User.find({
      roles: { $in: [supervisorRole._id] },
      ...(!onDepartment && { department: req.user.department })
    })
      .populate("department")
      .populate("roles")
      .exec();

    return res.json({ status: "success", data: supervisors });
  } catch (error) {
    console.error("Error fetching all Supervisor:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Fetch__sSTUDENTS__GET = async (req: Request, res: Response) => {
  try {
    const studentRole = await Role.findOne({ name: "Student" });
    const students = await User.find({ roles: { $in: [studentRole._id] } })
      .populate("department")
      .populate("roles")
      .exec();

    return res.json({ status: "success", data: students });
  } catch (error) {
    console.error("Error fetching all students:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
export const Fetch__STUDENTS__GET = async (req: Request, res: Response) => {
  try {
    const { onDepartment } = req.query;
    console.log(onDepartment);
    const studentRole = await Role.findOne({ name: "Student" });
    console.log(studentRole);

    const students = await User.find({
      roles: { $in: studentRole._id },
      ...(!onDepartment && { department: req.user.department })
    })
      .populate("department")
      .populate("roles")
      .exec();

    return res.json({ status: "success", data: students });
  } catch (error) {
    console.error("Error fetching all students:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
export const Fetch__USER__GET = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("department")
      .populate("roles")
      .exec();

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Update a user
export const Update__USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, email, department, password } = req.body;
    const pas = Password.toHash(password);

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, pas, department },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Create__USER__POST = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, department, password } = req.body;
    const roles: any = [];
    const ifuser = await User.findOne({ email: email });

    if (req.body.rolesState) {
      const allRoles = await Role.find();
      allRoles.forEach((r: any) => {
        if (req.body.rolesState[r._id] === true) {
          roles.push(r._id);
        }
      });
    }
    if (ifuser) {
      return res
        .status(404)
        .json({ status: "error", error: "Email Already Exists" });
    }
    const hashedPassword = await Password.toHash(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      department,
      roles: [...roles],
      password: hashedPassword
    });

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Update__OWN_USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming user ID is available in the request object
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating own profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Delete__USER__DELETE = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ status: "error", error: "user not found" });
    }

    return res.json({
      status: "success",
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
