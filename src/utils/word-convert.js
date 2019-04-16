const Kuroshiro = require('kuroshiro')
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji')
const analyzer = new KuromojiAnalyzer();
const kuroshiro = new Kuroshiro()

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


module.exports = {
    toHiragana,
    katakanaToHiragana
}