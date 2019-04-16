const mongoose = require('mongoose')


const gameSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
        unique: true
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
    }]
})

const Game = mongoose.model('Game', gameSchema)

module.exports = {
    Game
}