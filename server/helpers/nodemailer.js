import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Get __dirname equivalent in ES6 modules scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email Configuration
const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.PORTAL_EMAIL,
    pass: process.env.PORTAL_PASSWORD,
  },
};

//* SEND OTP EMAIL
export async function sendEmailOTP(
  username,
  userEmail,
  otp,
  title = "Verify Email"
) {
  try {
    // Create a transporter object using the email configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // Email Subject
    const subject =
      title === "Recovery Email"
        ? "Recovery Email Verification of Nab Estate Account"
        : title === "Change Email"
        ? "Verify Your New Email for Nab Estate Account"
        : "Verify Your Email for Nab Estate Account";

    // Render the email template with the given data
    const templateData = {
      username,
      otp,
      subject,
      imageCid: "logo-image",
    };

    // Render email template
    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "../views/email/otp.ejs"),
      templateData
    );

    // Set up the email options
    const mailOptions = {
      from: process.env.PORTAL_EMAIL,
      to: userEmail,
      subject,
      html: emailTemplate,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../public/assets/logo.png"),
          encoding: "base64",
          cid: "logo-image",
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return `OTP sent to via email successfully`;
  } catch (error) {
    return `Error! sending OTP to ${userEmail} via email: ${error}`;
  }
}

//* SEND LINK EMAIL
export async function sendEmailLink(
  username,
  userEmail,
  link,
  title = "Reset Password"
) {
  try {
    // Create a transporter object using the email configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // Email Subject
    const subject =
      title === "Change Email"
        ? "Change Your Nab Estate Account Email"
        : title === "Change Password"
        ? "Change Your Nab Estate Account Password"
        : "Reset Your Nab Estate Account Password";

    // Email Topic
    const topic =
      title === "Change Email"
        ? "change your email"
        : title === "Change Password"
        ? "change your password"
        : "reset your password";

    // Email Button Text
    const buttonText =
      title === "Change Email"
        ? "Change Email"
        : title === "Change Password"
        ? "Change Password"
        : "Recover Password";

    // Email Alert Message
    const alertMessage =
      title === "Change Email" || title === "Change Password"
        ? "Your request link will be expired after 5 minutes."
        : "If you did not request this, please ignore this email.";

    // Render the email template with the given data
    const templateData = {
      username,
      link,
      subject,
      topic,
      buttonText,
      alertMessage,
      imageCid: "logo-image",
    };

    // Render email template
    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "../views/email/link.ejs"),
      templateData
    );

    // Set up the email options
    const mailOptions = {
      from: process.env.PORTAL_EMAIL,
      to: userEmail,
      subject,
      html: emailTemplate,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../public/assets/logo.png"),
          encoding: "base64",
          cid: "logo-image",
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return `Link has been sent to via email successfully`;
  } catch (error) {
    return `Error! sending Link to ${userEmail} via email: ${error}`;
  }
}
