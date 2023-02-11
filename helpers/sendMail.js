const sendGrid = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

async function sendMail({ to, verificationToken }) {
  try {
    sendGrid.setApiKey(SENDGRID_API_KEY);
    const msg = {
      from: "marinapohiluk19@gmail.com",
      to,
      subject: "Please confirm your email",
      html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Confirm your email</a>`,
    };

    await sendGrid
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("App error:", error);
  }
}

module.exports = {
  sendMail,
};
