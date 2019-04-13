const mongoose = require('mongoose')
const logger = require('../log/logger')
const config = require('config')
const { prefix, userName, password, host, dbName } = config.get('dbConfig')    

const connectionStr =  `${prefix}://${userName}:${password}@${host}/${dbName}`

mongoose
    .connect(connectionStr, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => logger.info('Connected to MongoDB ...'))

