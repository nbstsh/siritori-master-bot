const Kuroshiro = require('kuroshiro')
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji')
const analyzer = new KuromojiAnalyzer();
const kuroshiro = new Kuroshiro()
const { Word } = require('../models/word')


let initCompleted = false 
kuroshiro.init(analyzer).then(() => {
    initCompleted = true
})

const toHiragana = async (word) => {
    if (!initCompleted) await kuroshiro.init(analyzer)

    const hiragana = await kuroshiro.convert(word)
    
    const isValid = hiragana.split().every(s => Kuroshiro.Util.isHiragana(s))
    return isValid ? hiragana : null
}

const findReplyWord = async (startWith) => {
    if (typeof startWith !== 'string' || startWith.length !== 1 || !startWith.match(/^[ぁ-ん]$/)) return 

    const words =  await Word.find({ startWith })
    const index = getRandomInt(words.length)
    return words[index]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



module.exports = { findReplyWord, toHiragana }