const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer, // Store image data as Buffer
        contentType: String // Store content type (e.g., image/png, image/jpeg)
    }
})


module.exports = mongoose.model('Post', postSchema)