import { Notification } from "../models/notification";
import { ProjectDoc, TProject } from "../models/project";
import { TUser, UserDoc } from "../models/user";
import sendLoginDetectedMail from "../services/mail/sendLoginDetectedMail";
import sendProjectApprovalMail from "../services/mail/sendProjectApprovalMail";

type PROJECT_APPROVAL = { project: TProject; student: UserDoc };
type LOGIN_DETECTED = { user: UserDoc; dateAndTime: string };

type NotificationType = "PROJECT_APPROVAL" | "LOGIN_DETECTED";

type NotificationData = {
  PROJECT_APPROVAL: PROJECT_APPROVAL;
  LOGIN_DETECTED: LOGIN_DETECTED;
};

const isProjectApproval = (data: any): data is PROJECT_APPROVAL => {
  return (
    data &&
    typeof data.project !== "undefined" &&
    typeof data.student !== "undefined"
  );
};

const isLogin = (data: any): data is LOGIN_DETECTED => {
  return data && typeof data.user !== "undefined";
};

export const sendNotification = async (
  type: NotificationType,
  data: NotificationData[NotificationType]
) => {
  switch (type) {
    case "PROJECT_APPROVAL":
      if (isProjectApproval(data)) {
        const message = {
          title: "Project Approved",
          message: "Your project : ${project.title}, has been approved",
          color: "primary",
          linkType: "project",
          user: data.student._id
        };

        await Notification.create(message);

        if (data.student.notification.email) {
          await sendProjectApprovalMail(data.student, data.project);
        }
      }
      break;
    case "LOGIN_DETECTED":
      if (isLogin(data)) {
        const message = {
          title: "Login Activity",
          message: "Your account was accessed",
          color: "primary",
          linkType: "none",
          user: data.user._id
        };

        await Notification.create(message);

        if (data.user.notification.email) {
          await sendLoginDetectedMail(data.user, data.dateAndTime);
        }
      }
      break;
    default:
      break;
  }
};
