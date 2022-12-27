import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    pass: process.env.MAIL_PASS,
    user: process.env.MAIL_USER,
  },
});

function makeANiceEmail(text: string): string {
  return `
        <div style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px">
            <h2>Hello there!</h2>
            ${text}
        </div>
    `;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
  const info = await transport.sendMail({
    to,
    fromt: "georgimavridis21@gmail.com",
    subject: "Your password reset token!",
    html: makeANiceEmail(`Your Password Reset Token is here!
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  });
  if (process.env.MAIL_USER.includes("ethereal.emai")) {
    console.log(`Message sent! Preview it here ${getTestMessageUrl(info)}`);
  }
}
