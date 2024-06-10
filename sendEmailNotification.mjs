/* eslint-disable no-undef */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmailNotification = async (subject, body, toEmail,regards) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            // eslint-disable-next-line no-undef
            user: process.env.EMAIL_USER, // use environment variable
            pass: process.env.EMAIL_PASS  // use environment variable
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: toEmail, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        exit: regards,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error('Error response:', error.response);
        }
    }
};

//Example usage
export const emailData = {
    subject: 'Test Subject',
    body: 'This is the Test Email for WebDriverIO TypeScript code.',
    toEmail: 'shrikantkhairnar313@gmail.com',
    regards: 'Thanks,\nDnT Team'
};

sendEmailNotification(emailData.subject, emailData.body, emailData.toEmail,emailData.regreds);
