export const browserMaximise = async (): Promise<void> => {
    await browser.maximizeWindow();
};

export const browserManimise = async (): Promise<void> => {
    await browser.minimizeWindow();
};