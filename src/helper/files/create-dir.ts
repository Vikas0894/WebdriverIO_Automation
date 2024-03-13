import fs from 'fs';

export const createDir = (dir: string): void => {
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};
