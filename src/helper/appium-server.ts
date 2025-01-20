import { exec } from 'child_process';
import fs from 'fs';

let appiumPath: string;

try {
    appiumPath = require.resolve('appium/build/lib/main.js');
} catch (e) {
    console.error('Error resolving Appium path:', e);
}

export class AppiumServer {
    private static serverProcess: any;
    private static port: number = 4723; // Default port

    public static setPort(port: number) {
        this.port = port;
    }

    public static start() {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(appiumPath)) {
                return reject(new Error(`Appium executable not found at path: ${appiumPath}`));
            }

            const command = `node ${appiumPath} --port ${this.port}`;

            this.serverProcess = exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error starting Appium server: ${error}`);
                    return reject(error);
                }
            });

            this.serverProcess.stdout.on('data', (data: string) => {
                if (data.includes('Appium REST http interface listener started')) {
                    console.log('Appium server started');
                    return resolve(true);
                }
            });

            this.serverProcess.stderr.on('data', (data: string) => {
                console.error(`Appium server error: ${data}`);
                return reject(data);
            });
        });
    }

    public static stop() {
        return new Promise((resolve) => {
            if (this.serverProcess) {
                this.serverProcess.kill('SIGINT');
                this.serverProcess.on('exit', () => {
                    console.log('Appium server stopped');
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }
}

export const appiumServer = new AppiumServer();
