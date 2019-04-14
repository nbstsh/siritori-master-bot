const collectWords = require('../utils/words-collect')
const { Word, validateWord } = require('../models/word')
const logger = require('../log/logger')

require('../startup/error')
require('../startup/config')
require('../startup/db')

const main = async () => {
    logger.info('Start collecting-word process ...')
    const words = await collectWords()

    const saveWordPromises = words.map(({ display, hiragana }) => {
        const startWith = hiragana[0]
        const word = { startWith, display, hiragana }

        // if display contains more than one word
        if (display.match(/\s|\.|,/)) return null

        const { error } = validateWord(word)
        if (error) return null 

        return new Word(word).save().then(() => {
            logger.info(`Successfully saved >>> { startWith: ${startWith}, display: ${display}, hiragana: ${hiragana}}`)
        })
    })

    await Promise.all(saveWordPromises)
}

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))