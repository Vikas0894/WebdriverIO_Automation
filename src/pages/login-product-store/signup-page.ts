import { timeouts } from "../../../config/timeouts-config";
import { ElementControl } from "../../base-controls/element-control";
import { InputControl } from "../../base-controls/input-control";
import { assertEqual } from "../../helper/assert/assert-equal";
import { getEmail } from "../../helper/get-email";
import { getRandomString } from "../../helper/get-random-string";
import path from 'path';
import { writeCSV } from "../../helper/files/write-csv-file";
import { appendToCSV } from "../../helper/files/update-csv-file";
import { TEXT_CONFIG } from "../../../config/text-config";

const username = getEmail(7);
const password = getRandomString('alphanumeric', 7);
const csvFilePath = path.join(__dirname, '../../../data/signup-data.csv'); // Adjust the file path as needed

const data = [
    { id: '1', username, id1: '2', password }
];

const headers = ['username', 'password'];

class SignupPage {
    protected async getSignUpLinkEl(): Promise<ElementControl> {
        return new ElementControl(await $('#signin2'));
    };

    protected async getTitleEl(): Promise<ElementControl> {
        return new ElementControl(await $('#signInModalLabel'));
    };

    protected async getSignUpUsernameInputEl(): Promise<InputControl> {
        return new InputControl(await $('//input[@id="sign-username"]'));
    };

    protected async getSignUpPasswordInputEl(): Promise<InputControl> {
        return new InputControl(await $('//input[@id="sign-password"]'));
    };

    protected async getSignUpBtnEl(): Promise<ElementControl> {
        return new ElementControl(await $('//button[@onclick="register()"]'));
    };

    /**
     * Logic
     */
    public async waitForPage(): Promise<void> {
        await (await this.getTitleEl()).waitForDisplayed(timeouts.medium, 'Title is not displayed');
    }

    public async clcikOnSignUp(): Promise<void> {
        await (await this.getSignUpLinkEl()).waitForDisplayed(timeouts.medium, 'SignUp Link is not displayed');
        await (await this.getSignUpLinkEl()).click();
    }

    public async fillUserAndPwd(): Promise<void> {
        //comented code for new file and new data
        // try {
        //     await writeCSV(csvFilePath, data, headers);
        //     console.log('CSV file written successfully');
        // } catch (error) {
        //     console.error('Error writing CSV file:', error);
        // }
        try {
            await appendToCSV(csvFilePath, data, headers);
            console.log('Data appended to CSV file successfully');
        } catch (error) {
            console.error('Error appending data to CSV file:', error);
        }
        await (await this.getSignUpUsernameInputEl()).setValue(username);
        await (await this.getSignUpPasswordInputEl()).setValue(password);
    }

    public async clcikOnSignUpBtn(): Promise<void> {
        await (await this.getSignUpBtnEl()).waitForClickable(timeouts.medium, 'SignUp Btn is not Clickable');
        await (await this.getSignUpBtnEl()).click();
    }

    public async VerifySignUp(): Promise<void> {
        try {
            await browser.waitUntil(async () => await browser.isAlertOpen(), {
                timeout: 5000,
                timeoutMsg: 'expected alert to be present after 5s'
            });
            const alertText = await browser.getAlertText();
            await assertEqual(TEXT_CONFIG.en.sucessful_signup_text, alertText, 'Text is not matched');
            await browser.acceptAlert();
            console.log(`Alert popup is accepted`);
        } catch (error) {
            console.error('Alert did not appear:', error);
            throw error;
        }
    }
}
export const signupPage = new SignupPage();
