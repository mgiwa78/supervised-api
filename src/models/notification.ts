import mongoose, { Document as Doc, Model } from "mongoose";

export interface TNotification {
  title: string;
  message: string;
  user: string;
  status: boolean;
  linkType: string;
  color: string;
}

export interface NotificationDoc extends Doc, TNotification {}

interface NotificationModel extends Model<NotificationDoc> {
  build(attrs: TNotification): NotificationDoc;
}

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  linkType: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

NotificationSchema.set("timestamps", true);

const Notification: NotificationModel = (mongoose.models?.Notification ||
  mongoose.model<NotificationDoc, NotificationModel>(
    "Notification",
    NotificationSchema
  )) as NotificationModel;

export { Notification };
