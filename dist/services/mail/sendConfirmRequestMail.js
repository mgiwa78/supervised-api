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
const __CONSTANTS__1 = require("../../__CONSTANTS__");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: __CONSTANTS__1.EMAIL,
        pass: __CONSTANTS__1.PASSWORD
    }
});
exports.default = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailHtml = `
<html>
  <head>
    <meta charset="utf-8">
    <title>Request Received - Furniture Showroom</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <h1>Request Received</h1>
    <p>Thank you for submitting your request for a furniture showroom.</p>
    <p>We have received your request and will review it shortly.</p>
    <p>If you have any questions or need further assistance, please feel free to contact us.</p>
    <p>Best regards,</p>
    <p>The Furniture Showroom Team</p>
  </body>
</html>`;
    const mailOptions = {
        from: "mgiwa78@gmail.com",
        to: email,
        subject: "Testing Gmail SMTP",
        text: "Request Confirmed",
        html: emailHtml
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
});
//# sourceMappingURL=sendConfirmRequestMail.js.map