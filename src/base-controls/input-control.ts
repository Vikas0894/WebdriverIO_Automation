import { browserKeys } from "../helper/browser/browser-keys";
import { ElementControl } from "./element-control";

export class InputControl extends ElementControl {
    public async setValue(value: string): Promise<void> {
        await this.scrollIntoView();
        await this.el.setValue(value);
    }

    public async clearValue(): Promise<void> {
        await this.scrollIntoView();

        while ((await this.getValue()) !== '') {
            await this.el.click();

            for (let i = 0; i <= 10; i++) {
                if (driver.isIOS) {
                    await driver.sendKeys(['\b']);
                } else if (driver.isAndroid) {
                    await driver.pressKeyCode(67);
                } else {
                    await browserKeys(['Backspace']);
                }
            }
        }
    }
}
