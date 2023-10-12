import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const emailProcess = async (job) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail(job.data);

  console.log("Message sent: %s", info.messageId);

  return nodemailer.getTestMessageUrl(info);
};
export default emailProcess;
