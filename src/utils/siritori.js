const Kuroshiro = require('kuroshiro')
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji')
const analyzer = new KuromojiAnalyzer();
const kuroshiro = new Kuroshiro()
const { Word } = require('../models/word')


let initCompleted = false 
kuroshiro.init(analyzer).then(() => {
    initCompleted = true
})

// if word include a letter which  can't be converted to hiragana, return null
const toHiragana = async (word) => {
    if (!initCompleted) await kuroshiro.init(analyzer)

    const converted = await kuroshiro.convert(word)
    const hiragana = katakanaToHiragana(converted)

    const isValid = hiragana.split().every(s => Kuroshiro.Util.isHiragana(s))

    return isValid ? hiragana : null
}

const katakanaToHiragana = (src) => {
	return src.replace(/[\u30a1-\u30f6]/g, function(match) {
		var chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	})
}

const findReplyWord = async (startWith) => {
    if (typeof startWith !== 'string' || startWith.length !== 1 || !startWith.match(/^[ぁ-ん]$/)) return 

    const words =  await Word.find({ startWith })
    if (words.length === 0) return null

    const index = getRandomInt(words.length)
    return words[index]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



module.exports = { findReplyWord, toHiragana, katakanaToHiragana }