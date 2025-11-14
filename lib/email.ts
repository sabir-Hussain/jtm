import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMagicLinkEmailParams {
  email: string;
  url: string;
}

export async function sendMagicLinkEmail({
  email,
  url,
}: SendMagicLinkEmailParams) {
  const emailFrom = process.env.EMAIL_FROM || "noreply@example.com";
  const emailFromName = process.env.EMAIL_FROM_NAME || "Your App";

  try {
    await resend.emails.send({
      from: `${emailFromName} <${emailFrom}>`,
      to: email,
      subject: "Sign in to your account",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sign in to your account</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px;">
              <h1 style="color: #111827; margin-bottom: 20px;">Sign in to your account</h1>
              <p style="color: #4b5563; margin-bottom: 30px;">
                Click the button below to sign in to your account. This link will expire in 24 hours.
              </p>
              <a href="${url}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-bottom: 30px;">
                Sign in
              </a>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                If you didn't request this email, you can safely ignore it.
              </p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">
                Or copy and paste this URL into your browser:<br>
                <a href="${url}" style="color: #2563eb; word-break: break-all;">${url}</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

