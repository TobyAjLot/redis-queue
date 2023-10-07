import nodemailer from "nodemailer";

const emailProcess = async (job) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tbajlot@gmail.com",
      pass: "",
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail(job.data);

  console.log("Message sent: %s", info.messageId);

  return nodemailer.getTestMessageUrl(info);
};
export default emailProcess;
