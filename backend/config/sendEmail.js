const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.RESEND_API) {
  console.log("Provide RESEND_API in side the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "QuickCart <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return null;
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (err) {
    console.error("Error occurred while sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
