import nodemailer from "nodemailer";
import fs from "fs";
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
      title === "Confirmation Email"
        ? "Change Your Nab Estate Account Email"
        : "Reset Your Nab Estate Account Password";

    // Email Topic
    const topic =
      title === "Confirmation Email"
        ? "change your email"
        : "reset your password";

    // Email Button Text
    const buttonText =
      title === "Confirmation Email" ? "Change Email" : "Recover Password";

    // Email Alert Message
    const alertMessage =
      title === "Confirmation Email"
        ? "If you did not request this, so be alert and change your account password immediately."
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

// async function sendEmailOTP(username, userEmail, otp) {
//   // Dynamic values
//   const replacements = {
//     username,
//     otp,
//   };

//   // Read and replace the HTML template
//   const emailTemplatePath = path.join(
//     __dirname,
//     "../public/email/otpEmail.html"
//   );
//   const emailTemplate = getEmailTemplate(emailTemplatePath, replacements);

//   // Create a transporter object using the email configuration
//   const transporter = nodemailer.createTransport(emailConfig);

//   // Set up the email options
//   const mailOptions = {
//     from: process.env.PORTAL_EMAIL,
//     to: userEmail,
//     subject: "Verify Your Email for Nab Estate Account",
//     html: emailTemplate,
//     attachments: [
//       {
//         filename: "logo.png",
//         path: path.join(__dirname, "../public/assets/logo.png"),
//         encoding: "base64",
//         cid: "logo-image",
//       },
//     ],
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return `OTP sent to via email successfully`;
//   } catch (error) {
//     return `Error! sending OTP to ${userEmail} via email: ${error}`;
//   }
// }

// // Function to read the HTML file and replace placeholders with dynamic values
// const getEmailTemplate = (templatePath, replacements) => {
//   let template = fs.readFileSync(templatePath, "utf8");
//   for (const [key, value] of Object.entries(replacements)) {
//     template = template.replace(new RegExp(`\\\${${key}}`, "g"), value);
//   }
//   return template;
// };
