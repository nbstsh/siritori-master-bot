const config = require('config')
const { middleware, Client, SignatureValidationFailed, JSONParseError } = require('@line/bot-sdk')
const { findReplyWord, toHiragana } = require('./siritori')
const lineConfig = config.get('lineConfig')

const client = new Client(lineConfig)

// Write your event handler here
// Default behaviour is just sending back the same text sent by client
const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null
    }

    let text = 'ん？ちょっと何を言ってるのかわからんのぉ、、、日本語にしてくれんか？'

    const givenHiragana = await toHiragana(event.message.text)

    if (givenHiragana) {
        const lastLetter = givenHiragana.split('').pop()
        const { display, hiragana } = await findReplyWord(lastLetter) || {}

        text = (display && hiragana) ? 
            `${display} (${hiragana})`:
            'すまん、ぼーっとしてた、、、もう一回送ってくれんかのぉ'
    } 
      
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text
    })
}

const handleError = (err, req, res, next) => {
    if (err instanceof SignatureValidationFailed) {
      res.status(401).send(err.signature)
      return
    } else if (err instanceof JSONParseError) {
      res.status(400).send(err.raw)
      return
    }
    next(err) // will throw default 500
}


module.exports = {
    client,
    handleEvent,
    handleError,
    middleware: middleware(lineConfig)
}

