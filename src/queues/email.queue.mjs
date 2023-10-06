import Bull from "bull";
import emailProcess from "../processes/email.process.mjs";

const emailQueue = new Bull("email", {
  redis: "redis://127.0.0.1:6379",
});

emailQueue.process(emailProcess);

const sendNewEmail = (data) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};

export { sendNewEmail };
