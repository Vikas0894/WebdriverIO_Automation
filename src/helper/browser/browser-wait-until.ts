export const browserWaitUntil = async (
    condition: () => boolean | Promise<boolean>,
    timeout: number,
    timeoutMsg: string,
): Promise<void> => {
    await browser.waitUntil(condition, { timeout, timeoutMsg });
};
