import express from "express";
import bodyParser from "body-parser";
import { sendNewEmail } from "./queues/email.queue.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/send-email", (req, res) => {
  res.sendFile(__dirname + "/public/emailForm.html");
});

app.post("/send-email", async (req, res) => {
  const { recipient, subject, message } = req.body;

  try {
    await sendNewEmail({
      from: process.env.USER,
      to: recipient,
      subject: subject,
      html: `<p>${message}</p>`,
    });
    res.send({ status: "Ok" });
  } catch (error) {
    res.json({ message: "An error occur while trying to send your mail" });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
