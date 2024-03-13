import { writeFileSync } from 'fs';

const stringify = require('csv-stringify');

export const writeCsvFile = (path: string, data: any): void => {
    stringify(
        data,
        {
            header: true,
        },
        (err: Error | undefined, output: string) => {
            if (err) {
                throw new Error(`Could not Stringify data. ${err.message}`);
            }

            writeFileSync(path, output);
        },
    );
};
