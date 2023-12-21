import { createLogger, format, transports } from 'winston';
import appRoot from 'app-root-path';
import * as colors from 'ansi-colors';
import DailyRotateFile from 'winston-daily-rotate-file';
var { combine, timestamp, prettyPrint, colorize, label, errors, printf, simple, splat } = format;

function withFunctionName(logger: any) {
    return new Proxy(logger, {
        get(target, prop) {
            if (typeof target[prop] === 'function') {
                return function (...args: any) {
                    const error: any = new Error();
                    const callerLine: any = error.stack.split('\n')[2];
                    const functionNameMatches: any = callerLine.match(/\s+at\s+(.*)\s+\(/);

                    const functionName: any = functionNameMatches ? functionNameMatches[1] : '';

                    target[prop]({
                        message: args.join(' '),
                        functionName,
                        timestamp: new Date().toISOString()
                    });
                };
            } else {
                return target[prop];
            }
        }
    });
}

/* A custom format for the logger. */
const myFormat = printf(({ level, message, timestamp, functionName }) => {
    if (functionName) {
        return `[${timestamp}] | [${colors.yellowBright(functionName)}] | ${level} | ${message}`;
    } else {
        return `[${timestamp}] | ${level} | ${message}`;
    }
});

const logger = createLogger({
    transports: [
        new transports.Console({
            level: process.env.LOGGING_LEVEL,
            handleExceptions: true,
            handleRejections: true,
            format: combine(
                format(info => ({ ...info, level: info.level.toUpperCase() }))(),
                colorize(),
                splat(),
                timestamp(),
                prettyPrint(),
                simple(),
                errors({ stack: true }),
                myFormat
            ),
        }),
        new DailyRotateFile({
            level: process.env.LOGGING_LEVEL,
            filename: `${appRoot}/logs/appLog-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '15d',
            handleExceptions: true,
            handleRejections: true,
            json: Boolean(process.env.LOG_JSON),
            format: Boolean(process.env.LOG_JSON) ? combine(
                format(info => ({ ...info, level: info.level.toUpperCase() }))(),
                timestamp(),
                prettyPrint(),
                errors({ stack: true })
            ) : combine(
                format(info => ({ ...info, level: info.level.toUpperCase() }))(),
                colorize(),
                splat(),
                timestamp(),
                prettyPrint(),
                simple(),
                errors({ stack: true }),
                myFormat
            ),
        })
    ],
    exitOnError: false,
});

export default withFunctionName(logger);