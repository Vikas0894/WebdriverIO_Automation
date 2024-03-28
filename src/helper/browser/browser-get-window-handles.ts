export const browserGetWindowHandles = async (): Promise<Array<string>> => {
    return browser.getWindowHandles();
};
