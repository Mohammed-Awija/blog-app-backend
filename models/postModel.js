const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,

    }
}, {timestamps: true})


module.exports = mongoose.model('Post', postSchema)