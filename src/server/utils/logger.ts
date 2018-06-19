import * as winston from 'winston'

// logger configuration here all files will be added to logs folder.
// Warning: server may fail if /logs folder not present
export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true
    })
  ],
  exitOnError: false
})

export const stream = {
  write: function (message) {
    logger.info(message)
  }
}
