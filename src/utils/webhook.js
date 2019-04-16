const config = require('config')
const { middleware, Client, SignatureValidationFailed, JSONParseError } = require('@line/bot-sdk')
const lineConfig = config.get('lineConfig')
const client = new Client(lineConfig)
const initSiritori = require('./siritori')

// Write your event handler here
// Default behaviour is just sending back the same text sent by client
const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null
    }

    const siritori = await initSiritori(event.source.userId)
    const replyMessages = await siritori.generateReplyMessages(event.message.text)
    const replayMessageObjs = replyMessages.map(text => ({ type: 'text', text }) )
      
    return client.replyMessage(event.replyToken, replayMessageObjs)
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

