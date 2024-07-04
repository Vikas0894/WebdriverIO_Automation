import { TEXT_CONFIG } from "../../../config/text-config";
import { timeouts } from "../../../config/timeouts-config";
import { ButtonControl } from "../../base-controls/button-control";
import { ElementControl } from "../../base-controls/element-control";
import { InputControl } from "../../base-controls/input-control";
import { assertEqual } from "../../helper/assert/assert-equal";
import { getEmail } from "../../helper/get-email";
import { getRandomString } from "../../helper/get-random-string";

class WdioLoginPage {
  public async getLogoEl(): Promise<ElementControl> {
    return new ElementControl(await $('//android.widget.ScrollView[@content-desc="Home-screen"]/android.view.ViewGroup/android.widget.ImageView[1]'));
  }

  public async getHomeWidgetEl(): Promise<ButtonControl> {
    return new ButtonControl(await $('//android.view.View[@content-desc="Home"]'));
  }

  private async getHeaderTitleEl(): Promise<ElementControl> {
    return new ElementControl(await $('//android.widget.TextView[@text="Login / Sign up Form"]'));
  }

  private async getLoginTitleEl(): Promise<ElementControl> {
    return new ElementControl(await $('//android.view.ViewGroup[@content-desc="button-login-container"]'));
  }

  private async getLoginWidgetEl(): Promise<WebdriverIO.Element> {
    return await $('//android.view.View[@content-desc="Login"]');
  }

  private async getEmailEditBoxEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.EditText[@content-desc="input-email"]'));
  }

  private async getPasswordEditBoxEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.EditText[@content-desc="input-password"]'));
  }

  private async getLoginBtnEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.view.ViewGroup[@content-desc="button-LOGIN"]'));
  }

  public async getLoginSuccessMsgEl(): Promise<WebdriverIO.Element> {
    return (await $('//android.widget.TextView[@resource-id="android:id/message"]'));
  }

  /**
   * Logic
   */

  public async waitForPage(): Promise<void> {
    await (await this.getLogoEl()).waitForDisplayed(timeouts.medium, "Home page is not displayed");
  }

  public async clickOnLoginWindget(): Promise<void> {
    await (await this.getLoginWidgetEl()).isDisplayed();
    await (await this.getLoginWidgetEl()).click();
  }

  public async fillEmailAndPwd(): Promise<void> {
    await (await this.getEmailEditBoxEl()).setValue(getEmail(8));
    await (await this.getPasswordEditBoxEl()).setValue(getRandomString("alphanumeric", 8));
  }

  public async clickLoginButton(): Promise<void> {
    await (await this.getLoginBtnEl()).isDisplayed();
    await (await this.getLoginBtnEl()).click();
  }

  public async verifyLoginPage(): Promise<void> {
    await (await this.getHeaderTitleEl()).expectToBeDisplayed("Header Title is not displayed");
    await (await this.getLoginTitleEl()).expectToBeEnabled("Login Title is not enabled");
  }

  public async verifySuccessLogin(): Promise<void> {
    try {
      const alertText = await (await this.getLoginSuccessMsgEl()).getText();
      assertEqual(TEXT_CONFIG.en.wdio_login_text, alertText, 'Text is not matched');
      await browser.acceptAlert();
    } catch (error) {
      console.error('Alert did not appear:', error);
      throw error;
    }
  }
}

export const wdioLoginPage = new WdioLoginPage();
