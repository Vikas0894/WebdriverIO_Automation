import { ITestCaseHookParameter } from '@cucumber/cucumber';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { emailData } from '../../data/email-data';
dotenv.config();

// Placeholder to store scenario names
let scenarioNames: string[] = [];

export const beforeScenario = function (this: ITestCaseHookParameter) {
    const scenarioName = this.pickle.name;
    scenarioNames.push(scenarioName);
};

// Hook to send email after all tests
export const after = async function () {
    // Define email transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, // use environment variable
            pass: process.env.EMAIL_PASS  // use environment variable
        }
    });
    // Create email subject
    const emailSubject = `Test Results for Scenarios: ${scenarioNames.join(', ')}`;

    // Path to Allure report
    const reportPath = path.resolve('./allure-report', 'index.html');
    console.log(reportPath);
    // Check if Allure report exists
    if (!fs.existsSync(reportPath)) {
        console.error('Allure report not found!');
        return;
    }
    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailData.toEmail,
        subject: emailSubject,
        text: emailData.body,
        regards: emailData.regards,
        attachments: [
            {
                filename: 'allure-report.html',
                path: reportPath
            }
        ]
    };
    try {
        console.log('Attempting to send email...');
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export async function scrollToElement(selector: string) {
    const element = await $(selector);
    const location = await element.getLocation();
    const size = await element.getSize();

    // Calculate start and end points for the swipe gesture
    const startX = location.x + size.width / 2;
    const startY = location.y + size.height / 2;
    const endY = startY - 100; // Adjust the value as needed

    // Perform the swipe gesture
    await driver.touchAction([
        { action: 'press', x: startX, y: startY },
        { action: 'moveTo', x: startX, y: endY },
        'release'
    ]);
}
