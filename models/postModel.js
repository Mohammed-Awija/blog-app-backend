const mongoose = require('mongoose')




const repliesSchema = new mongoose.Schema({
    createdBy: {
        type: String,
    }, 
    reply: { 
        type: String,
    },
}, {timestamps: true})


const commentsSchema = new mongoose.Schema({
    createdBy: {
        type: String,
    },
    comment: { 
        type: String,
    },
    replies: [repliesSchema]

}, {timestamps: true})

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
    imageName: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    likes: {
        type: Array,
    },
    comments: [commentsSchema],

}, {timestamps: true})





module.exports = mongoose.model('Post', postSchema)