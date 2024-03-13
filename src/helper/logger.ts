//import winston from "winston"
import {format, createLogger, transports, log, info, Logger } from "winston"

 // Format console.log
const consoleFormat = format.printf(({ level, message
}) => {
    const logLevel = format.colorize().colorize(level, `${level.toUpperCase()}`)
    return `[${logLevel}]: ${message}`
})
// Loggerallure serve

let logger = createLogger({
    transports: [
        new transports.Console({
            level: process.env.LOG_LEVEL,
            handleExceptions: true,
            format: format.combine(format.timestamp(), consoleFormat)
        })
    ]
})
// Print any unknown error
logger.on("error", error => {
    console.log("Unknown error in Winston logger")
    console.log(error.message)
})
export default logger
