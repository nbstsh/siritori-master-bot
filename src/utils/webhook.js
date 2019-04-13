const config = require('config')
const { middleware, Client, SignatureValidationFailed, JSONParseError } = require('@line/bot-sdk')
const lineConfig = {
    channelAccessToken: config.get('channelAccessToken'),
    channelSecret: config.get('channelSecret')
}

const client = new Client(lineConfig)

// Write your event handler here
// Default behaviour is just sending back the same text sent by client
const handleEvent = (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
      
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
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

