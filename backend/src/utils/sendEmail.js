import nodemailer from "nodemailer";
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
  FROM_NAME,
  NODE_ENV,
} from "../config/env.config.js";

// Create reusable transporter for Mailtrap
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/**
 * @desc Sends an email using Mailtrap SMTP service
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text message
 */

const sendEmail = async (to, subject, text, html = null) => {
  try {
    // Define mail options
    const mailOptions = {
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      text,
      html: html || `<p>${text.replace(/\n/g, "<br>")}</p>`,
      sandbox: true,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    if (NODE_ENV !== "production") {
      console.log(`Mailtrap email sent: ${info.messageId}`);
      console.log(`Preview at: ${nodemailer.getTestMessageUrl(info)}`);
    }

    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    // throw new Error("Failed to send email. Please try again later.");
  }
};

export default sendEmail;
