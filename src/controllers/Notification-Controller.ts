import { Request, Response } from "express";
import { Notification } from "../models/notification";

export const Send__NOTIFICATION__POST = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.create({
      user: "651d4619691c3cc837388baa",
      title: "title",
      message: "message"
    });

    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Send__NOTIFICATION = async (userID: string) => {
  try {
    const notification = await Notification.create({
      user: userID,
      title: "title",
      message: "message"
    });

    return notification;
  } catch (error) {
    console.log(error);
  }
};

export const Get__NOTIFICATION__GET = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1
    });
    console.log(notifications);
    return res.json({ status: "success", data: notifications });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Mark_as_read__NOTIFICATION__POST = async (
  req: Request,
  res: Response
) => {
  try {
    // const { userId } = req.params;
    // console.log(userId);

    await Notification.updateMany(
      { user: req.user.id, status: false },
      { $set: { status: true } }
    );

    const notifications = await Notification.find({ user: req.user.id });

    return res.json({ status: "success", data: notifications });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", error: error.message });
  }
};
