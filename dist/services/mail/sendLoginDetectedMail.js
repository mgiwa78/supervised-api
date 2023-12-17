"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const __CONSTANTS__1 = require("../../__CONSTANTS__");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: __CONSTANTS__1.EMAIL,
        pass: __CONSTANTS__1.PASSWORD
    }
});
exports.default = (user, dateAndTime) => __awaiter(void 0, void 0, void 0, function* () {
    const emailHtml = `
<style>
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Inter, Helvetica, "sans-serif";
  }
  a:hover {
    color: #009ef7;
  }
</style>

<div
    style="
      background-color: #ffffff;
      padding: 45px 0 34px 0;
      border-radius: 24px;
      margin: 40px auto;
      max-width: 600px;
    "
  >
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      height="auto"
      style="border-collapse: collapse"
    >
      <tbody>
        <tr>
          <td
            align="center"
            valign="center"
            style="text-align: center; padding-bottom: 10px"
          >
            <div style="text-align: left; margin-bottom: 54px">
              <div
                style="
                  font-size: 14px;
                  font-weight: 500;
                  margin: 0 60px 30px 60px;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >
                <p
                  style="
                    color: #181c32;
                    font-size: 28px;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-bottom: 24px;
                  "
                >
                  Account Logging Information
                </p>

                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  Dear ${user.lastName},
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  This email is to notify you about recent activity on your
                  account.
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                 Date and Time: ${dateAndTime}
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  Activity Type: Login
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  If this activity was authorized by you, no further action is
                  required from your side.
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  If you suspect any unauthorized access or have concerns
                  regarding this activity, please take immediate action by:
                </p>
                <div
                  style="
                    background: #f9f9f9;
                    border-radius: 12px;
                    padding: 35px 30px;
                  "
                >
                  <div style="display: flex">
                    <div
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 40px;
                        height: 40px;
                        margin-right: 13px;
                      "
                    >
                      1
                    </div>
                    <div>
                      <div>
                        <p
                          style="
                            color: #5e6278;
                            font-size: 13px;
                            font-weight: 500;
                            padding-top: 3px;
                            margin: 0;
                            font-family: Arial, Helvetica, sans-serif;
                          "
                        >
                          Changing your account password.
                        </p>
                      </div>
                      <div
                        class="separator separator-dashed"
                        style="margin: 17px 0 15px 0"
                      ></div>
                    </div>
                  </div>
                  <div style="display: flex">
                    <div
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 40px;
                        height: 40px;
                        margin-right: 13px;
                      "
                    >
                      2
                    </div>
                    <div>
                      <div>
                        <p
                          style="
                            color: #5e6278;
                            font-size: 13px;
                            font-weight: 500;
                            padding-top: 3px;
                            margin: 0;
                            font-family: Arial, Helvetica, sans-serif;
                          "
                        >
                          Reviewing recent activities on your account.
                        </p>
                      </div>
                      <div
                        class="separator separator-dashed"
                        style="margin: 17px 0 15px 0"
                      ></div>
                    </div>
                  </div>
                 
                </div>

                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  As always, we highly recommend maintaining the security of
                  your account by regularly updating your password and avoiding
                  sharing your credentials with anyone.
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  Thank you for your attention to this matter.
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  Sincerely, Supervised
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
`;
    const mailOptions = {
        from: "Supervised",
        to: user.email,
        subject: "Login Detected",
        // text: project.title,
        html: emailHtml
    };
    yield transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
});
//# sourceMappingURL=sendLoginDetectedMail.js.map