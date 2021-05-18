import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

async function sendEmail(receiverEmail: string, verificationLink) {
  try {
    console.log("init node");
    let transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );
    console.log("transport init done", transporter);

    let info = await transporter.sendMail({
      from: `"idsp.townsquare" juiyigung@hotmail.com`,
      to: receiverEmail,
      subject: "TownSquare Verification",
      html: `<p>Please click on the following link to verify your email: http://localhost:3000/api/user/verify?id=${verificationLink}</p>`,
    });
    console.log(info);
    console.log("message sent");
  } catch (err) {
    console.log(err);
  }
}

export default sendEmail;
