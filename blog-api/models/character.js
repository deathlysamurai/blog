const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        }, 
        // description: {
        //     type: String,
        //     required: true
        // },
        imagePath: {
            type: String,
            required: true
        },
        moves: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Move',
            required: true
        },
        health: {
            type: Number,
            required: true
        },
        // speed: {
        //     type: Number,
        //     required: true
        // }
    }
);

module.exports = mongoose.model('Character', characterSchema);