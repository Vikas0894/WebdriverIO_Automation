import { timeouts } from "../../../config/timeouts-config";
import { ElementControl } from "../../base-controls/element-control";
import { InputControl } from "../../base-controls/input-control";

class FailedTestcasePage {
    protected async getLoginLinkEl(): Promise<ElementControl> {
        return new ElementControl(await $('a#login2'));
    };

    protected async getUsernameInputEl(): Promise<InputControl> {
        return new InputControl(await $('#loginusername'));
    };

    protected async getPasswordInputEl(): Promise<InputControl> {
        return new InputControl(await $('#loginpassword'));
    };

    protected async getLoginBtnEl(): Promise<ElementControl> {
        return new ElementControl(await $('button[onclick="logIn()"]'));
    };

    /**
     * Logic
     */
    public async fillBlankUnAndPwd(): Promise<void> {
        await (await this.getLoginLinkEl()).click();
        await (await this.getUsernameInputEl()).setValue('');
        await (await this.getPasswordInputEl()).setValue('');
        await (await this.getLoginBtnEl()).click();
    }

    public async clickOnLoginButtn(): Promise<void> {
        await (await this.getLoginLinkEl()).waitForClickable(timeouts.small, 'Login link is not clickable');
        await (await this.getLoginBtnEl()).click();
    }
}
export const failedTestcasePage = new FailedTestcasePage();
