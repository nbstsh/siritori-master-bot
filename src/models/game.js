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

gameSchema.methods.reset = async function() {
    const game = this 

    game.words = []
    await game.save()
}

const Game = mongoose.model('Game', gameSchema)

module.exports = {
    Game
}