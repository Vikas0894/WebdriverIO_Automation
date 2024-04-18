import { ChildProcess, spawn } from 'child_process';

export class AppiumServer {
    private process: ChildProcess | null = null;

    async start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const appium = spawn('appium', [], {
                stdio: 'inherit',
                detached: true,
            });

            this.process = appium;

            appium.on('error', (err) => {
                console.error('Error starting Appium server:', err);
                reject(err);
            });

            appium.on('exit', (code) => {
                console.log(`Appium server exited with code ${code}`);
                this.process = null;
                if (code !== 0) {
                    reject(`Appium server exited with code ${code}`);
                } else {
                    resolve();
                }
            });
        });
    }

    async stop(): Promise<void> {
        if (this.process) {
            this.process.kill('SIGTERM');
            this.process = null;
        }
    }
}

export const appiumServer = new AppiumServer();
