const express = require('express')
const app = express()
const logger = require('./log/logger')

require('./startup/error')
require('./startup/config')
require('./startup/routes')(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => logger.info(`Start listening on port ${PORT}...`))