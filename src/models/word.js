const mongoose = require('mongoose')
const Joi = require('joi')

const wordSchema = new mongoose.Schema({
    startWith: {
        type: String,
        minlength: 1,
        maxlength: 1,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    hiragana: {
        type: String,
        required: true
    }
})


const Word = mongoose.model('Word', wordSchema)


const validateWord = (word) => {
    const schema = Joi.object().keys({
        startWith: Joi.string().min(1).max(1).required(),
        display: Joi.string().required(),
        hiragana: Joi.string().required(),
    })

    return Joi.validate(word, schema)
}


module.exports = { Word, validateWord }