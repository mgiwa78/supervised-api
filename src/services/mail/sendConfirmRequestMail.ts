import { EMAIL, PASSWORD } from "../../__CONSTANTS__";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

export default async (email: string) => {
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

  transporter.sendMail(
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
