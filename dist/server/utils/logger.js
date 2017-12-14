"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
winston['emitErrs'] = true;
exports.logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
exports.stream = {
    write: function (message) {
        exports.logger.info(message);
    }
};
