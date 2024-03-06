import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }: any) => {
  
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "10m",
    });

    let link = "";
    if (emailType === "verify") {
      link =
        process.env.FRONTEND_URL + `/verify-email?id=${userId}&token=${token}`;
    } else if (emailType === "reset") {
      link =
        process.env.FRONTEND_URL +
        `/reset-password?id=${userId}&token=${token}`;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APPEMAIL,
        pass: process.env.APPPASS,
      },
    });

    await transporter.sendMail({
      from: process.env.APPEMAIL, // sender address
      to: email, // list of receivers
      subject:
        emailType === "verify" ? "Verify your Email" : "Reset Password Link", // Subject line
      html: `
      <div>
        <p>Hi, </p>
        <p>${
          emailType === "verify"
            ? "Your Verification link:"
            : "Your Password Reset link"
        }: <a href=${link}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `,
    });
  } catch (error: any) {
    console.log("error here")
    // throw new Error(error.message);
  }
};
