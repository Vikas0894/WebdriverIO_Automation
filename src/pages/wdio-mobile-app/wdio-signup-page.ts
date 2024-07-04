import { TEXT_CONFIG } from "../../../config/text-config";
import { timeouts } from "../../../config/timeouts-config";
import { ElementControl } from "../../base-controls/element-control";
import { assertEqual } from "../../helper/assert/assert-equal";
import { wdioLoginPage } from "../../pages/wdio-mobile-app/wdio-login-page";

class WdioSignupPage {
  private async getSignUpTitleEl(): Promise<ElementControl> {
    return new ElementControl(await $('//android.widget.TextView[@text="Login / Sign up Form"]'));
  }

  private async getSignUpPageEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.view.ViewGroup[@content-desc="button-sign-up-container"]'));
  }

  private async getEmailEditBoxEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.EditText[@content-desc="input-email"]'));
  }

  private async getPasswordEditBoxEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.EditText[@content-desc="input-password"]'));
  }

  private async getConfirmPwdEditBoxEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.EditText[@content-desc="input-repeat-password"]'));
  }

  private async getSignUpBtnEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.view.ViewGroup[@content-desc="button-SIGN UP"]/android.view.ViewGroup'));
  }

  private async getAcceptAlertPopupEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.Button[@resource-id="android:id/button1"]'));
  }

  private async getAcceptAlertMsgEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.TextView[@resource-id="android:id/message"]'));
  }

  /**
   * Logic
   */

  public async waitForPage(): Promise<void> {
    await (await wdioLoginPage.getLogoEl()).waitForDisplayed(timeouts.medium, "Logo is not displayed");
    await (await wdioLoginPage.getHomeWidgetEl()).waitForDisplayed(timeouts.medium, "Home Widget is not displayed");
  }

  public async clickOnSignUp(): Promise<void> {
    await (await this.getSignUpPageEl()).click();
  }

  public async verifySignUpPage(): Promise<void> {
    await (await this.getSignUpTitleEl()).expectToBeDisplayed("Sign Up Title is not displayed");
  }

  public async fillEditBox(username: string, password: string): Promise<void> {
    await (await this.getEmailEditBoxEl()).setValue(username);
    await (await this.getPasswordEditBoxEl()).setValue(password);
  }

  public async enterConfirmPassword(confirmPwd: string): Promise<void> {
    await (await this.getConfirmPwdEditBoxEl()).setValue(confirmPwd);
  }

  public async clickOnSubmitBtn(): Promise<void> {
    await (await this.getSignUpBtnEl()).click();
  }

  public async verifySignUpPopUp(): Promise<void> {
    try {
      const alertText = await (await this.getAcceptAlertMsgEl()).getText();
      await assertEqual(TEXT_CONFIG.en.wdio_signup_text, alertText, 'Text is not matched');
    } catch (error) {
      console.error('Alert did not appear:', error);
      throw error;
    }
  }

  public async acceptAlertPopUp(): Promise<void> {
    try {
      await browser.acceptAlert();
      console.log(`Alert popup is accepted`);
    } catch (error) {
      console.error('Alert did not appear:', error);
      throw error;
    }
  }
}

export const wdioSignupPage = new WdioSignupPage();
