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
exports.default = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const emailHtml = `<html>
                        <head>
                          <meta charset="utf-8">
                          <title>Request Approved - Furniture Showroom</title>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              line-height: 1.5;
                            }
                          </style>
                        </head>
                        <body>
                          <h1>Furniture Showroom Request Approved</h1>
                          <p>Your request for a furniture showroom has been approved.</p>
                          <p>Please use the following token to sign up as the administrator:</p>
                          <p><strong>${token}</strong></p>
                          <p>Click <a href="http://example.com/admin-signup">here</a> to access the sign-up page.</p>
                          <p>Thank you for choosing our platform. We look forward to working with you!</p>
                        </body>
                      </html>`;
    const mailOptions = {
        from: "mgiwa78@gmail.com",
        to: email,
        subject: "Testing Gmail SMTP",
        text: token,
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
//# sourceMappingURL=sendApproveSuccessMail.js.map