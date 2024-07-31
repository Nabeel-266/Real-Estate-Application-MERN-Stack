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

export async function sendEmailOTP(username, userEmail, otp, title) {
  try {
    // Create a transporter object using the email configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // Render the email template with the given data and attachments
    let mailOptions = {};

    const subject =
      title === "Recovery Email"
        ? "Recovery Email Verification of Nab Estate Account"
        : "Verify Your Email for Nab Estate Account";

    // Read the email template and set mail options
    ejs.renderFile(
      path.join(__dirname, "../views/email/otp.ejs"),
      { username, otp, subject },
      (err, data) => {
        if (err) throw err;

        // Set up the email options
        mailOptions = {
          from: process.env.PORTAL_EMAIL,
          to: userEmail,
          subject,
          html: data,
          attachments: [
            {
              filename: "logo.png",
              path: path.join(__dirname, "../public/assets/logo.png"),
              encoding: "base64",
              cid: "logo-image",
            },
          ],
        };
      }
    );

    // Send the email
    await transporter.sendMail(mailOptions);

    return `OTP sent to via email successfully`;
  } catch (error) {
    return `Error! sending OTP to ${userEmail} via email: ${error}`;
  }
}

export async function sendEmailLink(username, userEmail, link) {
  try {
    // Create a transporter object using the email configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // Render the email template with the given data and attachments
    let mailOptions = {};

    // Read the email template and set mail options
    ejs.renderFile(
      path.join(__dirname, "../views/email/link.ejs"),
      { username, link },
      (err, data) => {
        if (err) throw err;

        // Set up the email options
        mailOptions = {
          from: process.env.PORTAL_EMAIL,
          to: userEmail,
          subject: "Reset Your Nab Estate Account Password",
          html: data,
          attachments: [
            {
              filename: "logo.png",
              path: path.join(__dirname, "../public/assets/logo.png"),
              encoding: "base64",
              cid: "logo-image",
            },
          ],
        };
      }
    );

    // Send the email
    await transporter.sendMail(mailOptions);

    return `Reset Password Link sent to via email successfully`;
  } catch (error) {
    return `Error! sending Reset Password Link to ${userEmail} via email: ${error}`;
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
