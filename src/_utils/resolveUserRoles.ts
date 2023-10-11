import { User } from "../models/user";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

const resolveUserRoles = async (id: string) => {
  const UserID = new ObjectId(id);
  const userWithRole = await User.findOne({ _id: UserID });

  console.log(userWithRole);
  return userWithRole?.roles;
};

export default resolveUserRoles;
