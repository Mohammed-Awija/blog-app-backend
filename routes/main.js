const express = require('express')
const router = express.Router()

//controllers
const { getPosts, createPost, editPost, deletePost} = require('../controllers/postsController')


router.route('/').get(getPosts).post(createPost)
router.route('/:id').patch(editPost).delete(deletePost)

module.exports = router 

