import { ElementControl } from "../../base-controls/element-control";

class HrmsLoginPage {
    public async getSigninTitle(): Promise<ElementControl> {
        return new ElementControl(await $('//h1[text()="Sign In Your Account"]'));
    }

    public async getUsernameEl(): Promise<ElementControl> {
        return new ElementControl(await $('//input[@name="identifier"]'));
    }

    public async getPasswordEl(): Promise<ElementControl> {
        return new ElementControl(await $('//input[@name="password"]'));
    }

    public async getLoginButtonEl(): Promise<ElementControl> {
        return new ElementControl(await $('//button[@type="button"]'));
    }

    public async getDdashboardUserProfileNameEl(): Promise<ElementControl> {
        return new ElementControl(await $('//div[@class="u_dashboard-user__profile-info"]/h5'));
    }

    /**
     * Logic
     */
    public async openHrmsApp(): Promise<void> {
        await browser.maximizeWindow();
        await browser.url('https://account.superworks.com/login');
    }

    public async verifyLoginPage(): Promise<void> {
        await (await this.getSigninTitle()).expectToBeDisplayed('Sign in Title is not displayed')
    }
}

export const hrmsLoginPage = new HrmsLoginPage();