const webhook = require('../routes/webhook')
const error = require('../middleware/error')
const siri = require('../routes/siri')

module.exports = (app) => {
    // webhook middleware needs to come before other body parser middleware
    app.use('/webhook', webhook)
    app.use('/siri', siri);
    app.use(error)
}