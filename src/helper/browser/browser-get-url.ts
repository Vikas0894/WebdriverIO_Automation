import { browser } from '@wdio/globals'

export const browserGetUrl = async (): Promise<string> => {
    return await browser.getUrl();
};