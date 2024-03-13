import fs from 'fs';

export const writeFile = (filePath: string, data: any): void => {
    fs.writeFileSync(filePath, data);
}
