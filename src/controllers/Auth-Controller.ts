import { Request, Response } from "express";
import { User, Department } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Password } from "../services/password";
import { JWT_SECRET } from "../__CONSTANTS__";
import { Role, TRole } from "../models/role";

interface DecodedToken extends JwtPayload {
  organization: { organizationId: string };
  token: string;
}
export const SignIn__AUTH__POST = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email })
      .populate("department")
      .exec();

    if (user.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const verifyPassword = await Password.compare(user[0].password, password);

    if (verifyPassword) {
      const roles = await Role.find({ _id: { $in: user[0].roles } });
      const department = await Department.findOne({ _id: user[0].department });

      const userData = {
        _id: user[0]._id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        department: department,
        roles: roles
      };

      const token = jwt.sign({ user: userData }, JWT_SECRET);

      return res.status(200).json({
        userAuth: userData,
        userJwt: token
      });
    }

    return res.status(400).json({ message: "Invalid user credentials" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const SignUp__AUTH__POST = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, roles } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({ error: "Email Already in use" });
    }
    const hashedPassword = await Password.toHash(password);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      roles: roles
    });
    const userData = { ...user.toObject(), password: null as string };

    const token = jwt.sign({ user: userData }, JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedToken;
    console.log(token);

    console.log("decoded:", decoded);

    res.json({
      status: "success",
      data: { userAuth: userData, userJwt: token }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const Fetch__USER_PROFILE__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const userData = req.user;

    const user = await User.findById(userData?.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
