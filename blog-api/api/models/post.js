const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }, 
        date: {
            type: Date,
            required: true
        },
        tags: {
            //Used for narrowing down searches, such as movies, or workouts
            type: [String],
            required: false
        },
        image: {
            type: String,
            required: false
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);