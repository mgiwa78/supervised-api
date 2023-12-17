import { Password } from "../services/password";
import { JWT_SECRET } from "../__CONSTANTS__";
import { User } from "../models/user";
import sendResetPasswordMail from "../services/mail/sendResetPasswordMail";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CURSOR_FLAGS } from "mongodb";

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h"
    });

    const mailResponse = await sendResetPasswordMail(email, resetToken);

    res.json({ message: "Reset token sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

export const passwordUpdateController = async (req: Request, res: Response) => {
  try {
    const { password, token }: { token: string; password: string } = req.body;
    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ status: "error", error: "Token Invalid" });
    }
    const user = await User.findOne({ email: decoded.email });
    const hashedPassword = await Password.toHash(password);

    user.password = hashedPassword;
    user.save();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Password Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const verifyPasswordRequestTokenController = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.body;
    console.log(token);
    if (!token) {
      return res.status(400).json({ status: "error", error: "Invalid Token" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return res.status(400).json({ status: "error", error: "Token Invalid" });
    }
    return res.status(200).json({ status: "success", message: "Valid Token" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
