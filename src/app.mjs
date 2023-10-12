import express from "express";
import bodyParser from "body-parser";
import { sendNewEmail } from "./queues/email.queue.mjs";

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { message, ...restBody } = req.body;
  await sendNewEmail({
    from: process.env.USER,
    ...restBody,
    html: `<p>${message}</p>`,
  });
  res.send({ status: "Ok" });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
