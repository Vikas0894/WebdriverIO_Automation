declare module 'allure-commandline' {
    export function generate(options: { source: string; destination: string; reportDir: string }): Promise<void>;
}
