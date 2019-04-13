const config = require('config')


if (!config.get('channelAccessToken')) {
    throw new Error('FATAL ERROR: channelAccessToken is not difined.')
}

if (!config.get('channelSecret')) {
    throw new Error('FATAL ERROR: channelSecret is not difined.')
}