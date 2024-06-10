export const driverPause = async (timeout: number): Promise<void> => {
    await driver.pause(timeout);
};