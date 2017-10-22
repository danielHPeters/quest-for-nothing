let winston = require('winston')
winston.emitErrs = true
// logger configuration here all files will be added to logs folder.
// Warning: server may fail if /logs folder not present
let logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
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
})

module.exports = logger
module.exports.stream = {
  write: function (message) {
    logger.info(message)
  }
}
