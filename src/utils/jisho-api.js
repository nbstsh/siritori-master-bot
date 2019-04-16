const rp = require('request-promise')
const uri = 'https://jisho.org/api/v1/search/words'


const search = async (keyword) => {
    if (!keyword || typeof keyword !== 'string') return 

    var options = {
        uri,
        qs: { keyword },
        json: true // Automatically parses the JSON string in the response
    }


    console.log({options})
    const result = await rp(options)

    console.log({result})
    const {data} = result 
    return data
}

module.exports = { search }