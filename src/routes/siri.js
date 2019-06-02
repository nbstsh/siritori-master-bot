const express = require('express')
const router = new express.Router()
const cors = require('cors')

const { Word } = require('../models/word')
const messages = require('../utils/reply-messages')
const { toHiragana } = require('../utils/word-convert')


router.use(express.json());
router.use(cors());

router.post('/replyWord', async (req, res) => {
    const word = req.body.word
    if (!word) return res.status(400).send({ error: 'Invalid request.'})

    const givenHiragana = await toHiragana(word)
     // givenText include a letter which  can't be converted to hiragana
     if (!givenHiragana) return res.send({ message: messages.invalid });

     if (givenHiragana.endsWith('ん')) {
        // await this.game.reset()
        return res.send({ message: messages.win });
    }

    const lastLetter = givenHiragana.split('').pop()
    const message = await findReplyWord(lastLetter)

    res.send({ message: message.hiragana })
})

const findReplyWord = async (startWith) => {
    if (typeof startWith !== 'string' || 
        startWith.length !== 1 || 
        !startWith.match(/^[ぁ-ん]$/)) throw new Error('Invalid startWith provied') 
        
    const words = await Word.find({ startWith })
    if (words.length === 0) return null

    const index = getRandomInt(words.length)
    const pickedWord = words[index]

    return pickedWord
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


module.exports = router