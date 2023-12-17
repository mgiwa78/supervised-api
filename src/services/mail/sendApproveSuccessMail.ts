import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../__CONSTANTS__";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

export default async (email: string, token: string) => {
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

  await transporter.sendMail(
    mailOptions,
    (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};
