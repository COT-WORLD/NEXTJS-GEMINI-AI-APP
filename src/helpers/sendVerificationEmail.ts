import { Resend } from "resend";
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = await render(
      VerificationEmail({ username, otp: verifyCode })
    );

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "AnonMessage | Verification code",
      html: emailHtml,
    });

    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
