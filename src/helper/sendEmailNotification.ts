import { ITestCaseHookParameter } from '@cucumber/cucumber';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

let scenarioNames: string[] = [];

export const beforeScenario = function (this: ITestCaseHookParameter) {
    const scenarioName = this.pickle.name;
    scenarioNames.push(scenarioName);
};

const zipAllureReport = async (sourceDir: string, outPath: string) => {
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive
            .directory(sourceDir, false)
            .on('error', err => reject(err))
            .pipe(stream);

        stream.on('close', () => resolve(outPath));
        archive.finalize();
    });
};

const generateAllureReport = () => {
    return new Promise((resolve, reject) => {
        const allureResultsDir = path.resolve('./allure-results', 'allure-results');
        const allureReportDir = path.resolve('./allure-report', 'allure-report');
        const command = `npx allure generate ${allureResultsDir} --clean -o ${allureReportDir}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating Allure report: ${error}`);
                console.error(stderr);
                return reject(error);
            }
            console.log(`Allure report generated successfully: ${stdout}`);
            resolve(stdout);
        });
    });
};

export const sendEmailWithAllureReport = async function () {
    console.log('After hook - Attempting to send email...');
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const emailSubject = `Test Results for Scenarios: ${scenarioNames.join(', ')}`;
    const reportDir = path.resolve('./allure-report', 'allure-report');
    const zipPath = path.resolve('./allure-report', 'allure-report.zip');

    if (!fs.existsSync(reportDir)) {
        console.error('Allure report not found!');
        return;
    }

    try {
        await zipAllureReport(reportDir, zipPath);
        console.log('Allure report zipped successfully:', zipPath);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'recipient-email@example.com',
            subject: emailSubject,
            text: 'Please find attached the Allure test report.',
            attachments: [
                {
                    filename: 'allure-report.zip',
                    path: zipPath,
                },
            ],
        };

        console.log('Attempting to send email...');
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    } finally {
        if (fs.existsSync(zipPath)) {
            fs.unlinkSync(zipPath); // Clean up the zip file after sending the email
        }
    }
};

export const after = async function () {
    console.log('Generating Allure report...');
    await generateAllureReport();
    await sendEmailWithAllureReport();
};
