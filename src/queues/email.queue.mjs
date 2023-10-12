import Bull from "bull";
import emailProcess from "../processes/email.process.mjs";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const emailQueue = new Bull("email", {
  redis: process.env.REDIS_URL,
});

emailQueue.process(emailProcess);

const sendNewEmail = (data) => {
  emailQueue.add(data, {
    attempts: 2,
  });
};

export { sendNewEmail };
