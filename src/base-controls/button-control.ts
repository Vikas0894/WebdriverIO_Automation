import { ClickOptions } from "webdriverio";
import { ElementControl } from "./element-control";
import { timeouts } from "../../config/timeouts-config";
import { browserWaitUntil } from "../helper/browser/browser-wait-until";
import { assertTrue } from "../helper/assert/assert-true";

export class ButtonControl extends ElementControl {
    public async click(clickOptions?: ClickOptions | undefined): Promise<void> {
        await this.waitForEnabled(timeouts.large, 'Button is not enabled');
        await super.click(clickOptions);
    }

    public async isEnabled(): Promise<boolean> {
        return (
            (!(await this.getAttribute('ng-reflect-disabled')) ||
                (await this.getAttribute('ng-reflect-disabled')) === 'false') &&
            !(await this.getAttribute('disabled'))
        );
    }

    public async waitForEnabled(timeout: number, timeoutMsg: string): Promise<void> {
        await browserWaitUntil(async () => this.isEnabled(), timeout, timeoutMsg);
    }

    public async isDisabled(): Promise<boolean> {
        return (await this.getAttribute('ng-reflect-disabled')) == 'true' || !!(await this.getAttribute('disabled'));
    }

    public async waitForDisabled(timeout: number, timeoutMsg: string): Promise<void> {
        await browserWaitUntil(async () => this.isDisabled(), timeout, timeoutMsg);
    }

    public async expectedToDisabled(message: string): Promise<void> {
        assertTrue(await this.isDisabled(), message);
    }
}
