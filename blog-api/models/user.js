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
            trim: true
        },
        // password: {
        //     type: String,
        //     required: true
        // }, 
        // level: {
        //     type: Number,
        //     required: true
        // },
        // xp: {
        //     type: Number,
        //     required: true
        // },
        // characters: {
        //     type: [mongoose.Schema.Types.ObjectId],
        //     ref: 'Character',
        //     required: false
        // }
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);