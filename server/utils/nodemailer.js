import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read the HTML file and replace placeholders with dynamic values
const getEmailTemplate = (templatePath, replacements) => {
  let template = fs.readFileSync(templatePath, "utf8");
  for (const [key, value] of Object.entries(replacements)) {
    template = template.replace(new RegExp(`\\\${${key}}`, "g"), value);
  }
  return template;
};

// Email Configuration
const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.PORTAL_EMAIL,
    pass: process.env.PORTAL_PASSWORD,
  },
};

async function sendEmailOTP(username, userEmail, otp) {
  // Dynamic values
  const replacements = {
    username,
    otp,
  };

  // Read and replace the HTML template
  const emailTemplatePath = path.join(
    __dirname,
    "../public/email/otpEmail.html"
  );
  const emailTemplate = getEmailTemplate(emailTemplatePath, replacements);

  // Create a transporter object using the email configuration
  const transporter = nodemailer.createTransport(emailConfig);

  // Set up the email options
  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: userEmail,
    subject: "Verify Your Email for Nab Estate Account",
    html: emailTemplate,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../public/assets/logo.png"),
        cid: "logo-image",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return `OTP sent to via email successfully`;
  } catch (error) {
    return `Error! sending OTP to ${userEmail} via email: ${error}`;
  }
}

export { sendEmailOTP };

// attachments: [
//   {
//     filename: "nab-estate-logo.png",
//     path: `${__dirname}/../../public/images/nab-estate-logo.png`,
//     cid: "logo-image",
//   },
// ],

// text: `Dear ${username},\n\nWelcome to Nab Estate family! Please use the OTP below to verify your email address:\n\nYour OTP is: ${otp}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nNab Estate Team`,
