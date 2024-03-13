const fs = require('fs');

export const removeDir = (dir: string): void => {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
    }
};
