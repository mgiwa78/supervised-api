import { Request, Response } from "express";
import { User, Department, UserDoc } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Password } from "../services/password";
import { JWT_SECRET } from "../__CONSTANTS__";
import { Role, TRole } from "../models/role";
import { sendNotification } from "../_utils/notification";

interface DecodedToken extends JwtPayload {
  organization: { organizationId: string };
  token: string;
}
export const SignIn__AUTH__POST = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: UserDoc = await User.findOne({ email: email })
      .populate("department")
      .exec();

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const verifyPassword = await Password.compare(user.password, password);

    if (verifyPassword) {
      const roles = await Role.find({ _id: { $in: user.roles } });
      const department = await Department.findOne({ _id: user.department });

      const userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        department: department,
        avatar: user.avatar,
        roles: roles
      };

      const currentDate = new Date();

      const dateAndTime = currentDate.toLocaleString();

      const token = jwt.sign({ user: userData }, JWT_SECRET);

      await sendNotification("LOGIN_DETECTED", { user, dateAndTime });

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
