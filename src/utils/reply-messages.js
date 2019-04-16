
// Max numbers of messages: 5
module.exports = {
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