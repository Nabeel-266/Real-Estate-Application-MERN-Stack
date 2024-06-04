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

async function sendEmailOTP(toUserMail, otp) {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: toUserMail,
    subject: "NAB Estate Account OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return `OTP sent to ${toUserMail} via email`;
  } catch (error) {
    return `Error! sending OTP to ${toUserMail} via email: ${error}`;
  }
}

export { sendEmailOTP };
