export const browserPause = async (timeout: number): Promise<void> => {
    await browser.pause(timeout);
};
