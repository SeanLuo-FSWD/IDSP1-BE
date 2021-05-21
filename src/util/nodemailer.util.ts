import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

async function sendEmail(receiverEmail: string, verificationLink) {
  try {
    let transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );

    let info = await transporter.sendMail({
      from: `"idsp.townsquare" juiyigung@hotmail.com`,
      to: receiverEmail,
      subject: "TownSquare Verification",
      html: `<p>Please click on the following link to verify your email: http://34.145.97.81/api/user/verify?id=${verificationLink}</p>`,
    });
  } catch (err) {
    console.log(err);
  }
}

export default sendEmail;
