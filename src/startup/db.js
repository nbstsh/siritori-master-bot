const mongoose = require('mongoose')
const logger = require('../log/logger')
const config = require('config')


mongoose
    .connect(config.get('dbConfig.connection'), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => logger.info('Connected to MongoDB ...'))

