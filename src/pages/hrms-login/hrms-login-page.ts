import { config } from "../../../config/enviroments-config";
import { timeouts } from "../../../config/timeouts-config";
import { ButtonControl } from "../../base-controls/button-control";
import { ElementControl } from "../../base-controls/element-control";
import { InputControl } from "../../base-controls/input-control";
import { browserMaximise } from "../../helper/browser/browser-maximise";
import { browserOpenUrl } from "../../helper/browser/browser-open-url";

class HrmsLoginPage {
    // public async getSigninTitle(): Promise<ElementControl> {
    //     return new ElementControl(await $('//h1[text()="Sign In Your Account"]'));
    // }

    // public async getUsernameEl(): Promise<InputControl> {
    //     return new InputControl(await $('//input[@name="identifier"]'));
    // }

    // public async getPasswordEl(): Promise<InputControl> {
    //     return new InputControl(await $('//input[@name="password"]'));
    // }

    // public async getLoginButtonEl(): Promise<ButtonControl> {
    //     return new ButtonControl(await $('//button[@type="button"]'));
    // }

    // public async getDdashboardUserProfileNameEl(): Promise<ElementControl> {
    //     return new ElementControl(await $('//div[@class="u_dashboard-user__profile-info"]/h5'));
    // }//button[@type="button"]

    // public async getNextButtonEl(): Promise<ButtonControl> {
    //     return new ButtonControl(await $('//button[@type="button"]'));
    // }

    // /**
    //  * Logic
    //  */
    // public async openHrmsApp(): Promise<void> {
    //     await browserMaximise();
    //     await browserOpenUrl(config.hrms);
    // }

    // public async verifyLoginPage(): Promise<void> {
    //     await (await this.getSigninTitle()).expectToBeDisplayed('Sign in Title is not displayed');
    // }

    // public async enterUsernameAndPassword(username:string,password:string): Promise<void> {
    //     await (await this.getUsernameEl()).waitForDisplayed(timeouts.small,'Username input field is not displayed');
    //     await (await this.getUsernameEl()).setValue(username);
    //     await (await this.getPasswordEl()).setValue(password);
    // }

    // public async clickLoginBtn(): Promise<void> {
    //     await (await this.getLoginButtonEl()).waitForClickable(timeouts.small,'Login button is not clickable');
    //     await (await this.getLoginButtonEl()).click();
    //     await (await this.getNextButtonEl()).waitForClickable(timeouts.small,'Next button is not clickable');
    //     await (await this.getNextButtonEl()).click();
    // }

    // public async verifyDashboardPage(): Promise<void> {
    //     await (await this.getDdashboardUserProfileNameEl()).expectToBeDisplayed('Ddashboard User Profile Name is not displayed');
    // }
}

export const hrmsLoginPage = new HrmsLoginPage();