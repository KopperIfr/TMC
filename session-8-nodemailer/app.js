import { transporter, verifyAccountEmail } from "./sendEmail.js";

transporter.sendMail(verifyAccountEmail, (error, info) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`Email sent: ${info.response}`);
});

