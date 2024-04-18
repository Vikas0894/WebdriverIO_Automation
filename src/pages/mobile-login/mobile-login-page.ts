import { timeouts } from "../../../config/timeouts-config";
import { ElementControl } from "../../base-controls/element-control";

class MobileLoginPage {
    private async getLoginOptionEl(): Promise<WebdriverIO.Element> {
        return await $('//android.widget.Button[@content-desc="Btn6"]');
    }

    private async getLoginPageEl(): Promise<ElementControl> {
        return new ElementControl(await $('//android.widget.TextView[@text="Login Page"]'));
    }

    private async getUserNameEditEl(): Promise<WebdriverIO.Element> {
        return (await $('//android.widget.EditText[@resource-id="com.code2lead.kwad:id/Et4"]'));
    }

    private async getPasswordEditEl(): Promise<WebdriverIO.Element> {
        return (await $('//android.widget.EditText[@resource-id="com.code2lead.kwad:id/Et5"]'));
    }

    private async getLoginBtnEl(): Promise<WebdriverIO.Element> {
        return (await $('//android.widget.Button[@resource-id="com.code2lead.kwad:id/Btn3"]'));
    }

    private async getAdminPageEl(): Promise<ElementControl> {
        return new ElementControl(await $('//android.widget.TextView[@text="Enter Admin"]'));
    }

    private async getAdminNameEditBoxEl(): Promise<WebdriverIO.Element> {
        return (await $('//android.widget.EditText[@resource-id="com.code2lead.kwad:id/Edt_admin"]'));
    }

    private async getSubmitButtonEl(): Promise<WebdriverIO.Element> {
        return (await $('//android.widget.Button[@resource-id="com.code2lead.kwad:id/Btn_admin_sub"]'));
    }

    private async getAdminPreviewEl(): Promise<ElementControl> {
        return new ElementControl(await $('//android.widget.TextView[@resource-id="com.code2lead.kwad:id/Tv_admin"]'));
    }

    private async getBackButtonEl(): Promise<WebdriverIO.Element> {
        return (await $('.android.widget.ImageButton'));
    }

    private async getHomePageEl(): Promise<ElementControl> {
        return new ElementControl(await $('//android.widget.TextView[@resource-id="com.code2lead.kwad:id/Tv_admin"]'));
    }

    /**
     * Logic
     */

    public async waitForPage(): Promise<void> {
        await (await this.getLoginPageEl()).waitForDisplayed(timeouts.medium, 'Home page is not displayed');
        //await (await this.getLoginOptionEl()).waitForClickable(timeouts.medium, 'Login option is not clickable');
    }

    public async clickOnLoginOption(): Promise<void> {
        //await (await this.getLoginOptionEl()).waitForClickable(timeouts.medium, 'Login option is not clickable');
        await (await this.getLoginOptionEl()).click();
    }

    public async enterUserAndPassword(username: string, password: string): Promise<void> {
        await (await this.getUserNameEditEl()).setValue(username);
        await (await this.getPasswordEditEl()).setValue(password);
    }

    public async clickOnLoginButton(): Promise<void> {
        //await (await this.getLoginBtnEl()).waitForClickable(timeouts.medium, 'Login Button is not clickable');
        await (await this.getLoginBtnEl()).click();
    }

    public async VerifyAdminPage(): Promise<void> {
        await (await this.getAdminPageEl()).expectToBeDisplayed('Admin page is not displayed');
    }

    public async enterAdminName(adminName: string): Promise<void> {
        await (await this.getAdminNameEditBoxEl()).setValue(adminName);
    }

    public async clickOnSubmitButton(): Promise<void> {
        //await (await this.getSubmitButtonEl()).waitForClickable(timeouts.medium, 'Submit Button is not clickable');
        await (await this.getSubmitButtonEl()).click();
    }

    public async VerifyAdminName(): Promise<void> {
        await (await this.getAdminPreviewEl()).expectToBeDisplayed('Admin page is not displayed');
    }

    public async clickOnNavigationButton(): Promise<void> {
        //await (await this.getBackButtonEl()).waitForClickable(timeouts.medium, 'Navigation Button is not clickable');
        await (await this.getBackButtonEl()).click();
        await (await this.getBackButtonEl()).click();
    }

    public async VerifyHomePage(): Promise<void> {
        await (await this.getHomePageEl()).expectToBeDisplayed('Admin page is not displayed');
    }
}

export const mobileLoginPage = new MobileLoginPage();
