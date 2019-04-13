const webhook = require('../routes/webhook')
const error = require('../middleware/error')

const { search } = require('../utils/jisho-api')

module.exports = (app) => {
    //TEST
    app.get('/test', async (req, res) => {
        const data = await search('あ')
        console.log({data})

        res.send(data)
    })

    // webhook middleware needs to come before other body parser middleware
    app.use('/webhook', webhook)
    app.use(error)
}