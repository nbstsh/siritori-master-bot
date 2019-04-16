const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { katakanaToHiragana } = require('./word-convert')


const url = 'https://www.matsu-kaze.net/mk/meishi/'


const fetchQueryStrings = async () => {
    const dom = await JSDOM.fromURL(url)
    if (!dom) return 

    const { document } = dom.window
    const optionEls = document.querySelectorAll('select.fields > option')

    return Array.from(optionEls)
        .map((el, i) => i >= 2 ? el.textContent.trim() : '')
        .filter(text => Boolean(text)) 
}


const fetchWords = async (queryString) => {
    const dom = await JSDOM.fromURL(`${url}?list=${encodeURI(queryString)}`)
    if (!dom) return 

    const { document } = dom.window
    const trEls = document.querySelectorAll('table.data_table tr')

    return Array.from(trEls)
        .map(el => {
            const tdEls = el.childNodes
            return {
                display: tdEls[0].textContent,
                hiragana: katakanaToHiragana(tdEls[2].textContent)
            }
        })
        .filter(({ display, hiragana }) => display.trim() && hiragana.trim())
}

/****
 *  result is array like this 
 * [{
 *      display: String,
 *      hiragana: String
 *  }]
 * */
const collectWords = async () => {
    const qsArray = await fetchQueryStrings()
    const listArray = await Promise.all(qsArray.map(qs => fetchWords(qs)))
    return listArray.reduce((a, c) => ([...a, ...c]), []) // flatten the array
}



module.exports = collectWords