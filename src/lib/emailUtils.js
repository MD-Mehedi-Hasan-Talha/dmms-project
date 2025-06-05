import crypto from "crypto";
import nodemailer from "nodemailer";

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate verification token
export function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Send verification email
export async function sendVerificationEmail(user, token) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email/${user.id}?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@messmanagement.com",
    to: user.email,
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email Address</h2>
        <p>Hello ${user.name},</p>
        <p>Thank you for registering with our Mess Management System. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>Mess Management Team</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
