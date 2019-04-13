const config = require('config')


if (!config.get('lineConfig.channelAccessToken')) {
    throw new Error('FATAL ERROR: channelAccessToken is not difined.')
}

if (!config.get('lineConfig.channelSecret')) {
    throw new Error('FATAL ERROR: channelSecret is not difined.')
}

if (!config.get('dbConfig.password')) {
    throw new Error('FATAL ERROR: dbConfig.password is not difined')
}

