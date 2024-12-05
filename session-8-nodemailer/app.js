import { transporter, verifyAccountEmailOptions } from "./sendEmail.js";

transporter.sendMail(verifyAccountEmailOptions, (error, info) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`Email sent: ${info.response}`);
});

