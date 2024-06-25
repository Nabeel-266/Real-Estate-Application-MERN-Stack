import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Email Configuration
const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.PORTAL_EMAIL,
    pass: process.env.PORTAL_PASSWORD,
  },
};

async function sendEmailOTP(username, userEmail, otp) {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: userEmail,
    subject: "Verify Your Email for Nab Estate Account",
    text: `Dear ${username},\n\nWelcome to Nab Estate family! Please use the OTP below to verify your email address:\n\nYour OTP is: ${otp}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nNab Estate Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return `OTP sent to via email successfully`;
  } catch (error) {
    return `Error! sending OTP to ${userEmail} via email: ${error}`;
  }
}

export { sendEmailOTP };
