const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        // firstName: {
        //     type: String,
        //     required: true
        // },
        // lastName: {
        //     type: String,
        //     required: true
        // },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
            type: String,
            required: true
        }, 
        level: {
            type: Number,
            required: true,
            default: 1
        },
        xp: {
            type: Number,
            required: true,
            default: 0
        },
        characters: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Character',
            required: false,
            default: []
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);