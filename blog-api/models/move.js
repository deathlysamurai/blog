const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        ability: {
            //What the move will do: Attack, Defend, Heal, Evade
            type: String,
            required: true
        },
        power: {
            //The effectiveness of the ability, such as 10 attack or 20 heal
            type: Number,
            required: true
        },
        uses: {
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model('Move', moveSchema);