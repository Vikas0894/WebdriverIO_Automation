export const browserSwitchToWindow = async (handle: string): Promise<void> => {
    await browser.switchToWindow(handle);
};
