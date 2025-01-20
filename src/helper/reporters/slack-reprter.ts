import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import archiver from 'archiver';
import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';

dotenv.config();

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL_ID || '';

if (!slackToken || !slackChannel) {
    throw new Error('Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID in the environment variables.');
}

export class SlackReporterUtil {
    static async sendSlackNotification(username: string) {
        console.log('Generating Allure report...');

        // Generate Allure Report
        try {
            require('child_process').execSync('allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
            console.log('Allure report generated successfully.');
        } catch (err) {
            console.error('Error generating Allure report:', err);
            return;
        }

        // Paths for report, screenshot, and zip
        const reportPath = path.resolve(process.cwd(), 'allure-report/index.html');
        const screenshotPath = path.resolve(process.cwd(), 'allure-report-screenshot.png');
        const zipFilePath = path.resolve(process.cwd(), 'allure-report.zip');

        // Check if Allure report exists
        if (!fs.existsSync(reportPath)) {
            console.error('Allure report not found at:', reportPath);
            return;
        }

        // Capture Screenshot of Allure Report
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle0' });
            await page.screenshot({ path: screenshotPath, fullPage: true });
            await browser.close();
            console.log(`Screenshot captured: ${screenshotPath}`);
        } catch (err) {
            console.error('Error capturing screenshot:', err);
            return;
        }

        // Zip the Allure Report
        try {
            const output = fs.createWriteStream(zipFilePath);
            const archive = archiver('zip', { zlib: { level: 9 } });
            archive.pipe(output);
            archive.directory(path.resolve(process.cwd(), 'allure-report'), false);
            await archive.finalize();
            console.log(`Allure report zipped: ${zipFilePath}`);
        } catch (err) {
            console.error('Error zipping Allure report:', err);
            return;
        }

        // Send Slack Notification
        const slackClient = new WebClient(slackToken);

        try {
            // Send Main Message
            const mainMessage = await slackClient.chat.postMessage({
                channel: slackChannel,
                text: `*Test Execution Summary*\nExecuted by: ${username}`,
            });

            console.log('Main message sent to Slack.');

            // Check if `ts` (timestamp) exists
            const threadTimestamp = mainMessage.ts ?? '';

            // Upload Screenshot
            if (fs.existsSync(screenshotPath)) {
                await slackClient.files.uploadV2({
                    channel_id: slackChannel,
                    thread_ts: threadTimestamp,
                    file: fs.createReadStream(screenshotPath),
                    title: 'Allure Report Screenshot',
                    filename: 'allure-report-screenshot.png', // Ensure the correct filename is used
                });
                console.log('Screenshot uploaded to Slack.');
            } else {
                console.error('Screenshot file not found:', screenshotPath);
            }

            // Upload Zipped Allure Report
            if (fs.existsSync(zipFilePath)) {
                await slackClient.files.uploadV2({
                    channel_id: slackChannel,
                    thread_ts: threadTimestamp,
                    file: fs.createReadStream(zipFilePath),
                    title: 'Allure Report',
                    filename: 'allure-report.zip',
                });
                console.log('Allure report uploaded to Slack.');
            } else {
                console.error('Zipped Allure report file not found:', zipFilePath);
            }
        } catch (err) {
            console.error('Error sending Slack notification:', err);
        }
    }
}
