import { ClickOptions } from 'webdriverio';
import { Location } from 'webdriverio/build/commands/element/getLocation';
import { Size } from 'webdriverio/build/commands/element/getSize';
import { timeouts } from '../../config/timeouts-config';
import { browserWaitUntil } from '../helper/browser/browser-wait-until';
import { assertEqual } from '../helper/assert/assert-equal';



export class ElementControl {
    protected el: WebdriverIO.Element;

    constructor(el: WebdriverIO.Element) {
        this.el = el;
    }

    public async getParentElement(): Promise<WebdriverIO.Element> {
        return this.el.$('..');
    }

    /**
     * Actions
     */
    public async click(clickOptions?: ClickOptions): Promise<void> {
        await this.scrollIntoView();
        await this.waitForClickable(timeouts.huge, `Element with selector: ${this.el.selector} is not clickable`);
        await this.el.click(clickOptions);
    }

    public async doubleClickCustom(clickOptions?: ClickOptions): Promise<void> {
        await this.scrollIntoView();
        await this.el.click(clickOptions);
        await this.el.click(clickOptions)
    }

    public async getText(trim: boolean = false): Promise<string> {
        await this.scrollIntoView();
        const text: string = await this.el.getText();

        return trim ? text.trim() : text;
    }

    public async getValue(): Promise<string> {
        return this.el.getValue();
    }

    public async getAttribute(attributeName: string): Promise<string> {
        return this.el.getAttribute(attributeName);
    }

    public async scrollIntoView(): Promise<void> {
        if (!(await this.isDisplayedInViewport())) {
            await this.el.scrollIntoView();
        }
    }

    public async scrollIntoViewTop(): Promise<void> {
        await this.el.scrollIntoView(true);
    }

    public async isDisplayedInViewport(): Promise<boolean> {
        return this.el.isDisplayedInViewport();
    }

    public async getLocation(): Promise<Location> {
        return this.el.getLocation();
    }

    public async getCenterLocationRounded(): Promise<Location> {
        const location = await this.getLocation();
        const size = await this.getSize();

        return {
            x: Math.round(location.x) + Math.round(size.width / 2),
            y: Math.round(location.y) + Math.round(size.width / 2),
        };
    }

    public async getSize(): Promise<Size> {
        return this.el.getSize();
    }

    public async dragAndDropMobile(
        direction: { x: number; y: number },
        duration: number = timeouts.smallest,
    ): Promise<void> {
        const location = await this.getCenterLocationRounded();

        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: location.x, y: direction.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 10 },
                    { type: 'pointerMove', duration: duration, origin: 'pointer', x: location.x, y: direction.y },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
    }

    public async clickRelativeCoordinates(
        coordinates: { x: number; y: number },
        duration: number = timeouts.smallest,
    ): Promise<void> {
        const location = await this.getCenterLocationRounded();

        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'mouse' },
                actions: [
                    {
                        type: 'pointerMove',
                        duration: 0,
                        x: Math.round(location.x) + coordinates.x,
                        y: Math.round(location.y) + coordinates.y,
                    },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 10 },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
    }

    /**
     * Boolean
     */
    public async isDisplayed(): Promise<boolean> {
        return this.el.isDisplayed();
    }

    /**
     * Wait
     */
    public async waitForDisplayed(timeout: number, timeoutMsg: string): Promise<void> {
        await this.el.waitForDisplayed({ timeout: timeout, timeoutMsg: timeoutMsg });
    }

    public async waitForDisplayedInViewPort(timeout: number, timeoutMsg: string): Promise<void> {
        //isDisplayedInViewPort does not work for iOs. is Clickable is used instead
        await this.el.waitUntil(async () => this.el.isClickable(), { timeout, timeoutMsg });
    }

    public async waitForClickable(timeout: number, timeoutMsg: string): Promise<void> {
        await browserWaitUntil(async () => this.el.isClickable(), timeout, timeoutMsg);
    }

    public async waitForNotDisplayed(timeout: number, timeoutMsg: string): Promise<void> {
        await this.el.waitForDisplayed({ timeout: timeout, timeoutMsg: timeoutMsg, reverse: true });
    }

    public async waitToHaveAnyText(timeout: number, timeoutMsg: string): Promise<void> {
        await browserWaitUntil(async () => (await this.getText()) !== '', timeout, timeoutMsg);
    }

    public async waitToHaveText(text: string, timeout: number, timeoutMsg: string, trim: boolean = true): Promise<void> {
        try {
            await browserWaitUntil(
                async (): Promise<boolean> => {
                    let currentText = await this.getText();

                    if (trim) {
                        currentText = currentText.trim();
                    }

                    return currentText === text;
                },
                timeout,
                timeoutMsg,
            );
        } catch (e: any) {
            throw new Error(`${e.message}. Expected text: ${text}. Actual text: ${await this.getText()}`);
        }
    }

    /**
     * Assert
     */

    public async expectToBeDisplayed(errorMsg: string): Promise<void> {
        await expect(this.el).toBeDisplayed({ message: errorMsg });
    }

    public async expectNotToBeDisplayed(errorMsg: string): Promise<void> {
        await expect(this.el).not.toBeDisplayed({ message: errorMsg });
    }

    public async expectNotToBeExist(errorMsg: string): Promise<void> {
        await expect(this.el).not.toExist({ message: errorMsg });
    }

    public async expectToHaveText(text: string, options?: ExpectWebdriverIO.StringOptions): Promise<void> {
        await expect(this.el).toHaveText(text, options);
    }

    public async expectToHaveAttribute(
        attribute: string,
        value?: string,
        options?: ExpectWebdriverIO.StringOptions,
    ): Promise<void> {
        await expect(this.el).toHaveAttribute(attribute, value, options);
    }

    public async expectToHaveClassContaining(
        className: string,
        options?: ExpectWebdriverIO.StringOptions,
    ): Promise<void> {
        await expect(this.el).toHaveElementClassContaining(className, options);
    }

    public async expectedToHaveClassNotContaining(className: string): Promise<void> {
        assertEqual((await this.getAttribute('class')).indexOf(className), -1, `Class contains ${className}`);
    }

    public async expectToBeEnabled(errorMsg: string): Promise<void> {
        await expect(this.el).toBeEnabled({ message: errorMsg });
    }

    public async expectToDisabled(errorMsg: string): Promise<void> {
        await expect(this.el).toBeDisabled({ message: errorMsg });
    }

    public async expectToHaveChildren(numberOptions: ExpectWebdriverIO.NumberOptions): Promise<void> {
        await expect(this.el).toHaveChildren(numberOptions);
    }
}
