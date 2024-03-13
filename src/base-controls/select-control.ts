import { timeouts } from "../../config/timeouts-config";
import { browserPause } from "../helper/browser/browser-pause";
import { ElementControl } from "./element-control";

export class SelectControl extends ElementControl {
    protected async getWrapper(): Promise<WebdriverIO.Element> {
        return $("//div[contains(@class,'popover-content')]");
    }

    protected async getItemInTheListEl(value: string): Promise<ElementControl> {
        return new ElementControl(await $(`//ion-item[.//ion-label[normalize-space(.)='${value}']]//ion-radio`));
    }

    public async selectItem(value: string): Promise<void> {
        await this.openList();
        const itemEl = await this.getItemInTheListEl(value);

        const message = `'${value}' item is not in the List`;
        try {
            await itemEl.waitForDisplayed(timeouts.small, message);
        } catch (e: any) {
            console.log("Error", e);
            if (e.message.indexOf(message) > -1) {
                await this.selectItem(value);
            } else {
                throw new Error(e.message);
            }
        }
        await itemEl.click();
    }

    public async openList(): Promise<void> {
        await browserPause(timeouts.smallest);
        await this.click();
        await new ElementControl(await this.getWrapper()).waitForDisplayed(timeouts.small, ' List is not visible');
        await browserPause(timeouts.smallest);
    }
}
