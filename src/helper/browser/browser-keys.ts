export const browserKeys = async (value: string | Array<string>): Promise<void> => {
    await browser.keys(value);
};
