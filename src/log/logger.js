const { createLogger, transports, format } = require('winston')


const logger = createLogger({
    format: format.json(),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }) 
    ]
})

logger.exceptions.handle(
    new transports.File({ filename: 'logs/exceptions.log' })
)


if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.simple()
    }))
} else {
    logger.add(new transports.Console())
}


module.exports = logger