const Kuroshiro = require('kuroshiro')
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji')
const analyzer = new KuromojiAnalyzer();
const kuroshiro = new Kuroshiro()
const config = require('config')
const invalidPattern = new RegExp(config.get('wordConfig.invalidPattern'))

let initCompleted = false
kuroshiro.init(analyzer).then(() => {
    initCompleted = true
})

// if word include a letter which  can't be converted to hiragana, return null
const toHiragana = async (word) => {
    if (!initCompleted) await kuroshiro.init(analyzer)

    if (invalidPattern.test(word)) return null

    const converted = await kuroshiro.convert(word)
    let hiragana = katakanaToHiragana(converted)
    return removeCharsExceptHiragana(hiragana)
}

const katakanaToHiragana = (src) => {
	return src.replace(/[\u30a1-\u30f6]/g, (match) => {
		const chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	})
}

const removeCharsExceptHiragana = (str) => {
    return str.split('').filter(s => Kuroshiro.Util.isHiragana(s)).join('')
}


module.exports = {
    toHiragana,
    katakanaToHiragana
}