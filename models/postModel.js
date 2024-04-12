const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
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
    },
    comments: {
        type: Array
    }
}, {timestamps: true})


module.exports = mongoose.model('Post', postSchema)