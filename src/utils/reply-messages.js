const { findReplyWord, toHiragana } = require('./siritori')

// Max numbers of messages: 5
const messages = {
    invalid: [
        'ん？ちょっと何を言ってるのかわからんのぉ、、、日本語かの？'
    ],
    win: [
        'んで終わってるぞ！！！ん、ん、ん~~！！！',
        'わしの勝ちじゃ、ハッハッハ',
        'Congratulations to わし!',
        'しかしながら、お主もなかなかやるの、次のしりとりも楽しみにしておるぞ'
    ],
    lose(letter) {
        return [
            `${letter}、、、${letter}、、、まだあるはずじゃ、、、`,
            `くそぉぉぉぉぉぉぉぉぉ！！！!！もう"${letter}"から始まる言葉がない、、、、`,
            `わしの負けじゃ。わしは引退じゃ。今日から君がしりとり名人じゃ！！！`
        ]
    },
    error: [
        '何をしてるんじゃ!空襲警報が聞こえんのか！！！しりとりなどしておる場合ではないぞ！！！',
        'しりとりの続きは防空壕についてからじゃ！！！',
        '逃げるんじゃ！！！走れ！！！！',
        '(世の中の不条理によりエラーが発生しました。時間を置いてからもう一度お試しください by 神)'
    ],
    replay({ display, hiragana}) {
        if (!display && !hiragana) throw new Error()

        return [
            `${display} (${hiragana})`
        ]
    } 
}

const generateReplyMessages = async (givenText) => {
    if (!givenText) return messages.invalid

    try {
        const givenHiragana = await toHiragana(givenText)
    
        // givenText include a letter which  can't be converted to hiragana
        if (!givenHiragana) return messages.invalid
    
        // siritori master win
        if (givenHiragana.endsWith('ん')) return messages.win
    
    
        const lastLetter = givenHiragana.split('').pop()
        const word = await findReplyWord(lastLetter)
    
        // siritori master lose
        if (!word) return messages.lose(lastLetter)
    
        // continue siritori
        return messages.replay(word)
    }
    catch (e) {
        return messages.error
    }
}



module.exports = { 
    generateReplyMessages
}