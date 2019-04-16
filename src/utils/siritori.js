const { Word } = require('../models/word')
const { Game } = require('../models/game')
const messages = require('./reply-messages')
const { toHiragana } = require('./word-convert')
const logger = require('../log/logger')

class Siritori { 
    constructor(game) {
        this.game = game
    }
    async findReplyWord(startWith) {
        if (typeof startWith !== 'string' || 
            startWith.length !== 1 || 
            !startWith.match(/^[ぁ-ん]$/)) throw new Error('Invalid startWith provied') 

        
        // const words =  await Word.find({ startWith })
        const invalidWordIds = this.game.words
        const words = await Word.find({ _id: { $nin: invalidWordIds }, startWith })
        if (words.length === 0) return null

        const index = getRandomInt(words.length)
        const pickedWord = words[index]

        // store word as already-used words list
        this.game.words.push(pickedWord._id)
        await this.game.save()

        return pickedWord
    }
    async generateReplyMessages(givenText) {
        if (!givenText) return messages.invalid
    
        try {
            const givenHiragana = await toHiragana(givenText)
        
            // givenText include a letter which  can't be converted to hiragana
            if (!givenHiragana) return messages.invalid
        
            // siritori master win
            if (givenHiragana.endsWith('ん')) {
                await this.game.reset()
                return messages.win
            }
        
            const lastLetter = givenHiragana.split('').pop()
            const word = await this.findReplyWord(lastLetter)
        
            // siritori master lose
            if (!word) {
                await this.game.reset()
                return messages.lose(lastLetter)
            }
        
            // continue siritori
            return messages.replay(word)
        }
        catch (e) {
            console.log(e)
            logger.error(e)
            return messages.error
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const initSiritori = async (userId) => {
    if (!userId) throw new Error()

    let game = await Game.findOne({ userId })
    if (!game) {
        game = await Game.create({ userId })
    }

    return new Siritori(game)
}


module.exports = initSiritori