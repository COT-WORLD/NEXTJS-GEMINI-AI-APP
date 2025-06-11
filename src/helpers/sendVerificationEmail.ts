import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/VerificationEmail";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const emailHtml = await render(
      VerificationEmail({ username, otp: verifyCode })
    );

    const transporter = createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    } as SMTPTransport.Options);
    await transporter.sendMail({
      from: '"AnonMessage" <no-reply@fake.com>',
      to: email,
      subject: "AnonMessage | Verification code",
      html: emailHtml,
    });
    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    console.log("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
