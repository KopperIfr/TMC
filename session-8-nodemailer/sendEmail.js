import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// ifrim.bussiness@gmail.com
// arthuroifrim2000@gmail.com

// Step 3: Configure the transporter
let transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service: 'gmail', 'yahoo', 'outlook', or specify a custom one.
    auth: {
        user: process.env.COMPANY_EMAIL, // Your email address
        pass: process.env.COMPANY_PWD // Your email password or app password
    }
});

let mailOptions = {
    from: 'arthuroifrim2000@gmail.com', // Sender address
    to: 'ifrim.bussiness@gmail.com', // List of receivers
    subject: 'Test Email with Nodemailer', // Subject line
    text: 'Hello from Nodemailer!', // Plain text body
    html: '<h1>Hello from Nodemailer!</h1>' // HTML body (optional)
};


const verifyAccountEmailOptions = {
    from: 'arthuroifrim2000@gmail.com',
    to: 'ifrim.bussiness@gmail.com', 
    subject: 'Email Verification', 
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #4CAF50; text-align: center;">Email Verification</h2>
        <p style="font-size: 16px;">Thank you for registering! Please verify your account by clicking the link below:</p>
        <br>
        <a href="https://your-verification-link.com" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center;">
        Verify Account
        </a>
        <br><br>
        <p style="font-size: 14px; color: #777;">If you didn’t create an account, you can safely ignore this email.</p>
    </div>
    `
};

export {
    verifyAccountEmailOptions,
    mailOptions,
    transporter
} 