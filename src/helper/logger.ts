import path from 'path';
import { createLogger, format, transports } from 'winston';

const timestamp = new Date().toISOString().replace(/:/g, "-");
const logFileName = path.join("./logs", `wdio-${timestamp}.log`);

const customFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
);

const logger = createLogger({
    level: 'debug',
    format: customFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: logFileName })
    ],
});

export default logger;
